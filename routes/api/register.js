
var dbFunctions = require("../../src/db.js");

module.exports = (app) => {
    app.post("/register/", async function (req, res, next) {
        const data = [
            req.body.email,
            req.body.password,
            req.body.name,
            req.body.birth
        ];
            

        let promise = register(data); 
        promise.then(function(value) {
            return res.status(200).json(value);
        })

        promise.catch (error => {
            return res.status(200).json(error);
        });

    });

};


