const express = require('express');
const router = express.Router();
const { Post } = require('../model/postSchema.js');
const { Counter } = require('../model/counterSchema.js');
const { User } = require('../model/userSchema');

//Swagger FAQ tags 설정
/**
 * @openapi
 * tags:
 *   name: FAQ
 *   description: FAQ 회원제 게시판 관련 API
 */

//Swagger FAQ- /faq/write API
/**
 * @openapi
 * /faq/write:
 *   post:
 *     summary: 게시물 작성
 *     description: 게시물을 작성하는 API
 *     tags:
 *       - FAQ
 *     requestBody:
 *       description: 게시물 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *                 example: 문의
 *               title:
 *                 type: string
 *                 example: 안녕하세요.
 *               content:
 *                 type: string
 *                 example: 안녕하세요. 문의드립니다.
 *               keyword:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: 가격,문의
 *               uid:
 *                 type: string
 *                 example: 1vTDwaeERwSTjtQO0CYoxcm6rIF2
 *               isSecret:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: 게시글 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *                   type: object
 *                   properties:
 *                     topic:
 *                       type: string
 *                       example: 문의
 *                     title:
 *                       type: string
 *                       example: 안녕하세요.
 *                     content:
 *                       type: string
 *                       example: 안녕하세요. 문의드립니다.
 *                     keyword:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: 가격,문의
 *                     isSecret:
 *                       type: boolean
 *                       example: false
 *                     communityNum:
 *                       type: number
 *                       example: 3
 *                     writer:
 *                       type: string
 *                       example: 64d227e32a7b32d6f50aaa6e
 *                     publishedDate:
 *                       type: date
 *                       example: 2023-08-13T16:25:23.502+00:00
 *                     __v:
 *                       type: number
 *                       example: 0
 *       404:
 *         description: 존재하지 않는 게시글
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "게시글이 존재하지 않습니다."
 *                 error:
 *                   type: string
 *                   example: "Not Found"
 *                 statusCode:
 *                   type: number
 *                   example: 404
 */

//게시물 작성 라우터
router.post('/write', (req, res) => {
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

					const PostModel = new Post(temp);
					PostModel.save().then(() => {
						Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } })
							.exec()
							.then(() => {
								res.status(201).json({ success: true });
							})
							.catch((err) => {
								console.error(err); // 오류를 콘솔에 출력해보세요.
								res.status(500).json({ success: false, error: '서버 내부 오류가 발생했습니다.' });
							});
					});
				});
		});
});

//Swagger FAQ- /faq API
/**
 * @openapi
 * /faq:
 *   get:
 *     summary: 게시물 조회
 *     description: 게시물 목록을 조회하는 API
 *     tags:
 *       - FAQ
 *     responses:
 *       200:
 *         description: 게시글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   topic:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   keyword:
 *                     type: string
 *                   isSecret:
 *                     type: boolean
 *                   communityNum:
 *                     type: number
 *                   publishedDate:
 *                     type: string
 *                     format: date-time
 *                   writer:
 *                     type: string
 *                     format: objectid
 *             example:
 *               - topic: 문의
 *                 title: "안녕하세요."
 *                 content: "안녕하세요. 문의드립니다."
 *                 keyword: "가격,문의"
 *                 isSecret: true
 *                 communityNum: 1
 *                 publishedDate: "2023-08-13T16:25:23.502+00:00"
 *                 writer: "64d227e32a7b32d6f50aaa6e"
 *               - topic: "요청"
 *                 title: 수리요청합니다.
 *                 content: 안녕하세요. as기간이 지났는데 수리가능한가요?
 *                 keyword: as,수리
 *                 isSecret: true
 *                 communityNum: 2
 *                 publishedDate: "2023-08-18T10:53:49.168+00:00"
 *                 writer: "64d227e32a7b32d6f50aaa6e"
 *               - topic: 전시
 *                 title: 10월 전시 문의드려요
 *                 content: 10월 전시일정 언제뜨나요?
 *                 keyword: 전시,일정
 *                 isSecret: true
 *                 communityNum: 3
 *                 publishedDate: "2023-09-20T10:21:23.148+00:00"
 *                 writer: "64d227e32a7b32d6f50aaa6e"
 *       404:
 *         description: 존재하지 않는 게시글
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "게시글이 존재하지 않습니다."
 *                 error:
 *                   type: string
 *                   example: "Not Found"
 *                 statusCode:
 *                   type: number
 *                   example: 404
 */

//게시물 리스트 출력 라우터
router.get('/lists', (req, res) => {
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
			res.status(404).json({ error: '게시글이 존재하지 않습니다.' });
		});
});

//상세페이지 출력 라우터
router.get('/detail', (req, res) => {
	Post.findOne({ communityNum: req.body.id })
		.populate('writer') // 작성자 정보 populate 추가
		.exec()
		.then((doc) => res.json({ success: true, detail: doc }))
		.catch((err) => res.json({ success: false, err: err }));
});

//게시물 수정 라우터
router.put('/update', (req, res) => {
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
router.delete('/delete', (req, res) => {
	Post.deleteOne({ communityNum: req.body.id })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch(() => res.json({ success: false }));
});

module.exports = router;
