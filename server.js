const express = require("express");
const mongoose = require("mongoose");
const books = require("./Route/books.route");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.MONGODB_URI, {
		dbName: process.env.DB_NAME,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("mongodb connected.");
	})
	.catch((err) => console.log(err.message));
    
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello");
});

app.use("/books", books);

app.listen(PORT, (req, res) => {
	console.log(`app listening at http://localhost:${PORT}`);
});
