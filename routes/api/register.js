
var dbFunctions = require("../../src/db.js");

module.exports = (app) => {
    app.post("/register/", async function (req, res, next) {
        console.log(req.body);
        let data = [];
        data[0] =  req.body.email;
        data[1] =  req.body.password;
        data[2] = req.body.name;
        data[3] = req.body.birth;
        
            

        let promise = register(data); 
        promise.then(function(value) {
            return res.status(200).json(value);
        }).catch (error => {
            return res.status(200).json(error);
        });

    });

};


