const express = require("express");
const route = express.Router();
const Book = require("../Model/books.mode");

route.get("/", async (req, res) => {
	const books = Book.find();
	res.status(200).send(books);
});

route.post("/", async (req, res) => {
	const book = Book.find({ title: req.title, author: req.author, publishing_year: req.publishing_year });

	if (!book) {
		const save_book = await book.save();
		res.status(201).send({
			book,
			message: "Review saved successfully.",
		});
	}
});

module.exports = route;