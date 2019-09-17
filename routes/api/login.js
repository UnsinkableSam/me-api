var db = require("../../src/db.js");

module.exports = (app) => {
    app.post("/login/:details", async function (req, res, next) {
        var arr = JSON.parse(req.query.array);
        const data = {
            "username": arr[0],
            "password": arr[1]

        };
        result = await passwordCompare(data);
        if (result) {
            res.json(await signIn(data.username));
        } else {
            res.json("Failed");
        }

    });

};




