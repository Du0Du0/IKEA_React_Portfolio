const express = require('express');
const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: 테스트
 *   description: 테스트 API
 */

/**
 * @openapi
 * /api:
 *   get:
 *     summary: API 테스트
 *     description: API 테스트
 *     tags:
 *       - 테스트
 *     parameters:
 *       - name: name
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/hello', function (req, res, next) {
	const name = req.query.name || 'World';
	res.json({ message: `Hello ${name}` });
});

module.exports = router;
