const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT;
const cors = require('cors');
const { Post } = require('./model/postSchema.js');
const { Counter } = require('./model/counterSchema.js');
const { User } = require('./model/userSchema.js');
require('dotenv').config();
const MONGODB_ID = process.env.SERVER_MONGODB_ID;
const MONGODB_PASSWORD = process.env.SERVER_MONGODB_PASSWORD;

app.use(cors());

//클라이언트로부터 보내진 데이터를 전달받도록 설정 (body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express에서 react안쪽 build폴더까지의 경로를 static하게 지정
app.use(express.static(path.join(__dirname, './client/build')));

app.listen(port, () => {
	mongoose
		.connect(`mongodb+srv://${MONGODB_ID}:${MONGODB_PASSWORD}@cluster0.5goswz5.mongodb.net/?retryWrites=true&w=majority`, { useUnifiedTopology: true })

		.then(() => console.log(`Server app listening on port ${port} with MongoDB`))
		.catch((err) => console.log(err));
});

app.get('/', (req, res) => {
	//서버에서 5000포트로 접속하면 static폴더로 지정되어 있는 build안쪽의 index.html을 화면에 내보냄
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('*', (req, res) => {
	//어떤 URL에서 접속하더라도 화면이 뜨도록 설정
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//게시물 작성 라우터
app.post('/api/create', (req, res) => {
	const temp = req.body;

	//1-카운터 모델에서 communityNum을 찾은 다음에 프론트에서 받은 객체에 추가
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			temp.communityNum = doc.communityNum;
			//temp = {title, content, uid, communityNum}

			//2-User컬렉션에서 현재로그인 사용자의 uid값으로 해당 유저정보 다큐먼트 찾고
			//해당 다큐먼트의 objectId값을 writer속성에 추가
			User.findOne({ uid: temp.uid })
				.exec()
				.then((doc) => {
					temp.writer = doc._id;
					//temp = {titel, content, uid, communityNum, writer}

					//3-해당 post모델의 writer 프로퍼티안에는 작성자정보의 다큐먼트가 참조된
					//참조된 모델객체를 저장하고 저장이 성공하면 카운터 컬랙션의 communtiyNum 값 증가
					const PostModel = new Post(temp);
					PostModel.save().then(() => {
						Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } })
							.exec()
							.then(() => {
								res.json({ success: true });
							})
							.catch((err) => res.json({ success: false, err: err }));
					});
				});
		});
});

//게시물 리스트 출력 라우터
app.post('/api/read', (req, res) => {
	Post.find()
		.populate('writer')
		.sort({ createdAt: -1 })
		.exec()
		.then((doc) => {
			console.log(doc);
			res.json({ success: true, communityList: doc });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});

//상세페이지 출력 라우터
app.post('/api/detail', (req, res) => {
	Post.findOne({ communityNum: req.body.id })
		.populate('writer') // 작성자 정보 populate 추가
		.exec()
		.then((doc) => res.json({ success: true, detail: doc }))
		.catch((err) => res.json({ success: false, err: err }));
});

//게시물 수정 라우터
app.post('/api/update', (req, res) => {
	const temp = {
		topic: req.body.topic,
		title: req.body.title,
		content: req.body.content,
		keyword: req.body.keyword,
	};
	Post.updateOne({ communityNum: req.body.id }, { $set: temp })
		.exec()
		.then((doc) => {
			console.log(doc);
			res.json({ success: true });
		})
		.catch((err) => res.json({ success: false }));
});

//게시물 삭제 라우터
app.post('/api/delete', (req, res) => {
	Post.deleteOne({ communityNum: req.body.id })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch(() => res.json({ success: false }));
});

//회원정보 라우터
app.post('/api/join', (req, res) => {
	const temp = req.body;

	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			temp.userNum = doc.userNum;

			const userData = new User(temp);
			userData.save().then(() => {
				Counter.updateOne({ name: 'counter' }, { $inc: { userNum: 1 } })
					.exec()
					.then(() => {
						res.json({ success: true });
					})
					.catch((err) => res.json({ success: false, err: err }));
			});
		});
});

// 서버 시작 시 게시물 번호 초기값 생성
const initializeCounter = async () => {
	try {
		const doc = await Counter.findOne({ name: 'counter' });

		// 'counter' 문서가 존재하지 않으면 초기값 생성
		if (!doc) {
			await Counter.create({
				name: 'counter',
				communityNum: 0,
				userNum: 0,
			});
			console.log('초기값이 성공적으로 생성되었습니다.');
		} else {
			console.log('초기값이 이미 존재합니다:', doc);
		}
	} catch (error) {
		console.error('초기값 생성 중 에러 발생:', error);
	}
};

//작성자 정보 조회
app.post('/api/user', (req, res) => {
	const { uid } = req.body;
	User.findOne({ uid })
		.exec()
		.then((user) => {
			if (user) {
				res.json({ success: true, user });
			} else {
				res.json({ success: false, message: 'User not found' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false, message: 'Error finding user' });
		});
});

// 서버가 시작될 때 초기값 생성
if (require.main === module) {
	// 서버가 직접 실행될 때에만 initializeCounter() 함수를 호출
	initializeCounter();
}
