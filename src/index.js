const path = require("path");
const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "web/index.html")));
app.get("/main.css", (req, res) => res.sendFile(path.join(__dirname, "web/main.css")));
app.get("/game.js", (req, res) => res.sendFile(path.join(__dirname, "game.js")));
app.listen(port, () => console.log("Server běží"));