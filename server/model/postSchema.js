const mongoose = require('mongoose');

const postShema = new mongoose.Schema(
	{
		topic: String,
		title: String,
		content: String,
		communityNum: Number,
		publishedDate: {
			type: Date,
			default: Date.now, //현재 날짜를 기본값으로 지정
		},
		userNum: Number,
	},
	{ collection: 'Posts' }
);

const Post = mongoose.model('Posts', postShema);
module.exports = { Post };
