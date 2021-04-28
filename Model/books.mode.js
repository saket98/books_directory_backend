const Mongoose = require("mongoose");

const Book = new Mongoose.Schema({
	title: { type: String, require: true },
	auther: { type: String, require: true },
	publisher: { type: String, require: true },
	price: { type: Number, require: true },
	publishing_year: { type: Number },
	genre: { type: String },
});

module.exports = Book;
