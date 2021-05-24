const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	company: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
	},
	created_date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Contact = mongoose.model("Contact", contactSchema);
