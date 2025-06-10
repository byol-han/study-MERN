var express = require("express");
var router = express.Router();

/* GET home page. */

var name = "Byol";
var day = "Monday";

router.get("/", function (req, res, next) {
  res.render("index", {
    title: name,
    message: "Hello from Handlebars!",
  });
});

module.exports = router;
