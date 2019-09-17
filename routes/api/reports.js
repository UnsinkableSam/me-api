



module.exports = (app) => {
    app.post("/:reports",
        (req, res, next) => checkToken(req, res, next),
        (req, res) => reports.addReport(res, req.body));

    function checkToken(req, res, next) {
        const token = req.headers['x-access-token'];

        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                // send error response
            }

            // Valid token send on the request
            next();
        });
    }

};
