const express = require("express");
const route = express.Router();
const BookSchema = require("../Model/books.mode");

route.get("/", async (req, res, next) => {
	try {
		const books = await BookSchema.find();
		res.status(200).send(books);
	} catch (error) {
		next(error);
	}
});

route.post("/", async (req, res, next) => {
	try {
		const book = await BookSchema.findOne({ $and: [{ title: req.body.title }, { author: req.body.author }, { publishing_year: req.body.publishing_year }] });
		if (!book) {
			const save_body = new BookSchema(req.body);
			const book = await save_body.save();
			res.status(201).send({
				book,
				message: "Book saved successfully.",
			});
		} else {
			res.status(400).send({
				message: "Book already exist",
			});
		}
	} catch (error) {
		next(error);
	}
});

route.delete("/:id", async (req, res, next) => {
	try {
		const bookId = req.params.id;
		console.log(bookId);
		const book = await BookSchema.findByIdAndDelete(bookId);
		console.log(book);
		if (book) res.status(200).send({ message: `Book with id ${bookId} has been deleted` });
		else res.status(400).send({ message: "Wrong ID provided" });
	} catch (error) {
		next(error);
	}
});

route.put("/:id", async (req, res, next) => {
	try {
		const bookId = req.params.id;
		const book = await BookSchema.findById(bookId);
		if (book) {
			book.title = req.body.title || book.title;
			book.author = req.body.author || book.author;
			book.publisher = req.body.publisher || book.publisher;
			book.price = req.body.price || book.price;
			book.publishing_year = req.body.publishing_year || book.publishing_year;
			book.genre = req.body.genre || book.genre;

			await book.save();
			res.status(201).send({
				book,
				message: "Book updated successfully.",
			});
		} else {
			res.status(400).send({
				message: "Wrong ID provided",
			});
		}
	} catch (error) {
		next(error);
	}
});

module.exports = route;
