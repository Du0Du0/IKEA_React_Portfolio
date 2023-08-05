const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const port = 5000;
const cors = require('cors');
const { Post } = require('./model/postSchema.js');
const { Counter } = require('./model/counterSchema.js');

app.use(cors()); // cors 미들웨어 추가

//클라이언트로 부터 보내진 데이터를 전달받도록 설정 (body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express에서 react안쪽 build폴더까지의 경로를 static하게 지정
app.use(express.static(path.join(__dirname, './client/build')));

app.listen(port, () => {
	mongoose
		.connect('mongodb+srv://du0du0:!abcd1234@cluster0.5goswz5.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true })

		//접속 성공시
		.then(() => console.log(`Server app listening on port ${port} with MongoDB`))
		//접속 실패시
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
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			const PostModel = new Post({
				topic: req.body.topic,
				title: req.body.title,
				content: req.body.content,
				communityNum: doc.communityNum,
			});
			console.log('doc', doc);
			PostModel.save().then(() => {
				//update : $inc(증가), $dec(감소), $set(새로운값으로 변경)
				Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } })
					.then(() => {
						res.json({ success: true });
					})
					.catch(() => res.json({ success: false }));
			});
		});
});

//게시물 리스트 출력 라우터
app.post('/api/read', (req, res) => {
	Post.find()
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
		.exec()
		.then((doc) => res.json({ success: true, detail: doc }))
		.catch((err) => res.json({ success: false, err: err }));
});

//회원정보 라우터
router.post('/join', (req, res) => {
	const temp = req.body;

	Counter.findOne({ name: 'counter' }).then((doc) => {
		temp.userNum = doc.userNum;

		const userData = new User(temp);
		userData.save().then(() => {
			Counter.updateOne({ name: 'counter' }, { $inc: { userNum: 1 } })
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
			});
			console.log('초기값이 성공적으로 생성되었습니다.');
		} else {
			console.log('초기값이 이미 존재합니다:', doc);
		}
	} catch (error) {
		console.error('초기값 생성 중 에러 발생:', error);
	}
};

// 서버가 시작될 때 초기값 생성
if (require.main === module) {
	// 서버가 직접 실행될 때에만 initializeCounter() 함수를 호출
	initializeCounter();
}
