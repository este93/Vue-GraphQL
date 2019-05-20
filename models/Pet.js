const mongoose = require('mongoose');

const PetsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	race: {
		type: String,
		required: true
	},
	image: {
		type: String
	},
	createdDate: {
		type: Date,
		default: Date.now
	},
	likes: {
		type: Number,
		default: 0
	},
	// property === path
	// ref === model
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	comments: [{
		commentBody: {
			type: String,
			required: true
		},
		commentDate: {
			type: Date,
			default: Date.now
		},
		commentUser: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		}
	}]
});

module.exports = mongoose.model('Pet', PetsSchema);