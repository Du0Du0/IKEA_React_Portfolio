const express = require('express');
const router = express.Router();
const { User } = require('../model/userSchema');
const { Counter } = require('../model/counterSchema');

//회원정보 라우터
router.post('/api/join', (req, res) => {
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
router.post('/api/user', (req, res) => {
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
