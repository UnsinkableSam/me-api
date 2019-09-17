// var express = require("express");
// var router = express.Router();
var db = require("../../src/db.js");

module.exports = (app) => {
    app.post("/register/:details", async function (req, res, next) {
        console.log(req.query.array);
        // const data = {
        //     data: {
        //         regform: req.query.array
        //     }
        // };
        // register(req.query.array);
        res.json("success");
    });

};


