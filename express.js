const express = require("express");
const app = new express();


app.use(express.static("./page"));

module.exports = app;