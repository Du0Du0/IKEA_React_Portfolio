const express = require('express');
const router = express.Router();
const { User } = require('../model/userSchema');
const { Counter } = require('../model/counterSchema');
const { Post } = require('../model/postSchema.js');

//Swagger User tags 설정
/**
 * @openapi
 * tags:
 *   name: User API
 *   description: 회원 정보 API
 */

//Swagger User- /user/join API
/**
 * @openapi
 * /user/join:
 *   post:
 *     summary: 회원 가입 API
 *     description: 회원 가입하는 API
 *     tags:
 *       - User API
 *     requestBody:
 *       description: 회원 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *                 example: administrator
 *               uid:
 *                 type: string
 *                 example: g7YDKlmY91OPG9WFgqaf9NuxyTq2
 *               userNum:
 *                 type: number
 *                 example: 0
 *     responses:
 *       201:
 *         description: 회원 가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 displayName:
 *                   type: string
 *                   example: administrator
 *                 uid:
 *                   type: string
 *                   example: g7YDKlmY91OPG9WFgqaf9NuxyTq2
 *                 userNum:
 *                   type: number
 *                   example: 0
 *       404:
 *         description: 존재하지 않는 회원
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회원이 존재하지 않습니다."
 *                 error:
 *                   type: string
 *                   example: "User Not Found "
 *                 statusCode:
 *                   type: number
 *                   example: 404
 */

//회원 가입 라우터
router.post('/join', (req, res) => {
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
					.catch((err) => {
						console.log(err);
						res.json({ success: false });
						res.status(404).json({ error: '게시글이 존재하지 않습니다.' });
					});
			});
		});
});

//Swagger User- /user API
/**
 * @openapi
 * /user:
 *   get:
 *     summary: 게시물 작성자 조회 API
 *     description: 게시물 작성자 조회하는 API
 *     tags:
 *       - User API
 *     parameters:
 *       - name: uid
 *         in: query
 *         description: 회원 식별자
 *         required: true
 *         schema:
 *           type: string
 *           example: g7YDKlmY91OPG9WFgqaf9NuxyTq2
 *     requestBody:
 *       description: 회원 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *                 example: administrator
 *               uid:
 *                 type: string
 *                 example: g7YDKlmY91OPG9WFgqaf9NuxyTq2
 *               userNum:
 *                 type: number
 *                 example: 0
 *     responses:
 *       200:
 *         description: 게시물 작성자 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 displayName:
 *                   type: string
 *                   example: administrator
 *                 uid:
 *                   type: string
 *                   example: g7YDKlmY91OPG9WFgqaf9NuxyTq2
 *                 userNum:
 *                   type: number
 *                   example: 0
 *       404:
 *         description: 존재하지 않는 작성자
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "작성자가 존재하지 않습니다."
 *                 error:
 *                   type: string
 *                   example: "User Not Found "
 *                 statusCode:
 *                   type: number
 *                   example: 404
 */

//게시물 작성자 조회
router.get('/user', (req, res) => {
	const { uid } = req.body;
	User.findOne({ uid })
		.exec()
		.then((user) => {
			if (user) {
				res.json({ success: true, user });
			} else {
				console.log(err);
				res.json({ success: false });
				res.status(404).json({ error: 'User Not Found' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
			res.status(404).json({ error: 'User Not Found' });
		});
});

module.exports = router;
