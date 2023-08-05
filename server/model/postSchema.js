const mongoose = require('mongoose');

const postShema = new mongoose.Schema(
	{
		topic: String,
		title: String,
		content: String,
		communityNum: Number,
	},
	{ collection: 'Posts' }
);

const Post = mongoose.model('Posts', postShema);
module.exports = { Post };
