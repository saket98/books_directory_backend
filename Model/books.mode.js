const Mongoose = require("mongoose");

const BookSchema = new Mongoose.Schema({
	title: { type: String, require: true },
	author: { type: String, require: true },
	publisher: { type: String, require: true },
	price: { type: Number, require: true },
	publishing_year: { type: Number },
	genre: { type: String },
});

module.exports = Mongoose.model("Book", BookSchema);;
