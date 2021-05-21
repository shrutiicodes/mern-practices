const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
	firstName: {
		type: String,
		required: "Enter the First Name",
	},
	lastName: {
		type: String,
		required: "Enter the Last Name",
	},
	email: {
		type: String,
	},
	company: {
		type: String,
	},
	phone: {
		type: Number,
	},
	created_date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Contact = mongoose.model("Contact", contactSchema);
