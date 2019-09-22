var db = require("../../src/db.js");

module.exports = (app) => {
    app.post("/login/", async function (req, res, next) {
        console.log(req.body);
        const data = {
            username: req.body.username,
            password: req.body.password
        };
        console.log(data);
        result = await passwordCompare(data);
        if (await result) {
            res.json(await signIn(data.username));
        } else {
            res.json("Failed");
        }

    });

};







