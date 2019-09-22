
var db = require("../../src/db.js");

module.exports = (app) => {
    app.post("/register/", async function (req, res, next) {
        const data = {
            username: req.body.username,
            password: req.body.password
        };
        result = register(data);
        res.status(200).json(result);
    });

};


