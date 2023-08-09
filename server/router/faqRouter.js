const express = require('express');
const router = express.Router();
const { Post } = require('./model/postSchema.js');
const { Counter } = require('./model/counterSchema.js');

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

module.exports = router;
