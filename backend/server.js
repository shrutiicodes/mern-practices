const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const data = require("./data/people.json");

dotenv.config();

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

//Init middleware
app.use(express.json({ extended: false }));

app.use(cors());

app.use(express.static(__dirname + "/public"));
app.use("/images", express.static(__dirname + "/images"));

app.get(
	"/user/:id/",
	(req, res, next) => {
		// res.send(`get request is sending on port ${PORT}`);
		console.log(req.params.id); // String
		let user = Number(req.params.id); //Number/ Integer
		console.log(user);
		console.log(data[user]);
		res.send(data[user]);
		next();
	},
	(res, req) => {
		console.log("The second function");
	}
);

app
	.route("/profiles")
	.get((req, res) => {
		// res.end();
		// res.redirect("https://www.linkedin.com/");
		res.json(data);
	})
	.put((req, res) => {
		res.send(`put request is sending on port ${PORT}`);
	})
	.delete((req, res) => {
		res.send(`delete request is sending on port ${PORT}`);
	});

app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
