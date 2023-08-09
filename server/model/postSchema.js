const mongoose = require('mongoose');

const postShema = new mongoose.Schema(
	{
		topic: String,
		title: String,
		content: String,
		keyword: String,
		communityNum: Number,
		publishedDate: {
			type: Date,
			default: Date.now, //현재 날짜를 기본값으로 지정
		},

		//User컬랙션에서 참조하고자 하는 document의 object_id가 등록되면
		//해당 다큐먼트의 정보값을 post에서 참조
		writer: {
			ref: 'User',
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{ collection: 'Posts', timestamps: true }
);

const Post = mongoose.model('Posts', postShema);
module.exports = { Post };
