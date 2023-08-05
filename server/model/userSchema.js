const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		displayName: String,
		uid: String,
		userNum: Number,
	},
	{ collection: 'User' }
);

const User = mongoose.model('User', userSchema);
module.exports = { User };
