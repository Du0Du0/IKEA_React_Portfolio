const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
const path = require('path');
const app = express();
const cors = require('cors');
require('dotenv').config();
const MONGODB_ID = process.env.SERVER_MONGODB_ID;
const MONGODB_PASSWORD = process.env.SERVER_MONGODB_PASSWORD;
const { Post } = require('./model/postSchema.js');
const { Counter } = require('./model/counterSchema.js');
const { User } = require('./model/userSchema');

app.use(cors());

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Swagger Examples',
			version: '1.0.0',
		},
	},
	apis: ['./router/*.js'], // files containing annotations as above
};
const openapiSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

//클라이언트로부터 보내진 데이터를 전달받도록 설정 (body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express에서 react안쪽 build폴더까지의 경로를 static하게 지정
app.use(express.static(path.join(__dirname, './client/build')));

app.use('/api', require('./router/api'));

//faq 전용 라우터 추가
app.use('/faq', require('./router/faqRouter'));

//유저 전용 라우터 추가
app.use('/api/user', require('./router/userRouter'));

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

// 서버가 시작될 때 초기값 생성
if (require.main === module) {
	// 서버가 직접 실행될 때에만 initializeCounter() 함수를 호출
	initializeCounter();
}
