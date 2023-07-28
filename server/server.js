const express = require('express');
const app = express();
const path = require('path');
const port = 5000;

//클라리언트로 부터 보내진 데이터를 전달받도록 설정 (body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//express에서 client측 build폴더까지의 경로를 static하게 지정
app.use(express.static(path.join(__dirname, './client/build')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
	console.log(`Server app listening on port ${port}`);
});
