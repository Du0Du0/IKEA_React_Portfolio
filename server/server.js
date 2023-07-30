const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const port = 5000;

//클라이언트로 부터 보내진 데이터를 전달받도록 설정 (body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express에서 react안쪽 build폴더까지의 경로를 static하게 지정
app.use(express.static(path.join(__dirname, './client/build')));

app.listen(port, () => {
	mongoose
		.connect('mongodb+srv://du0du0:!abcd1234@cluster0.5goswz5.mongodb.net/?retryWrites=true&w=majority')

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

//리액트로부터 전달된 요청 라우터
app.post('/api/send', (req, res) => {
	console.log(req.body);
	res.json({ success: true, result: req.body.name + '2' });
});
