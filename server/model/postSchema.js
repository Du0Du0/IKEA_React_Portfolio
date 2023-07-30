const mongoose = require('mongoose');

const postShema = new mongoose.Schema(
	{
		title: String,
		content: String,
		communityNum: Number,

		writer: {
			ref: 'User',
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{ collection: 'Posts', timestamps: true }
);

const Post = mongoose.model('Post', postShema);
module.exports = { Post };
