const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String
	},
	image: {
		type: String
	},
	createdDate: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Animal', AnimalSchema);