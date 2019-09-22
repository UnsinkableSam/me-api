
var db = require("../../src/db.js");

module.exports = (app) => {
    app.post("/register/", async function (req, res, next) {
        console.log("hello");
        const data = {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name, 
            birth: req.body.birth
        };
        console.log(data);
        result = register(data);
        res.status(200).json(result);
    });

};


