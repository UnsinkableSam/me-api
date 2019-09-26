
var dbFunctions = require("../../src/db.js");






module.exports = (app) => {
    app.post("/reports", async function (req, res, next) {
        const token = req.headers['sexbomb'];
        if (verify(token, res, next)) {
            const data = {
                filename: req.body.filename,
                file: req.body.file
            };
            // console.log( await saveReport(data, res));
            let promise = saveReport(data);
            promise.then(function (value) {
                return res.status(200).json(value);
            })

            promise.catch(error => {
                return res.status(200).json(error);
            });
            
        }
       
        


    });



    app.get("/reports/week/:name", async function (req, res, next) {
        const data = {
            filename: req.params.name
        };

        const resend = await getTextMarkdown(data);
        console.log(resend);
        return res.send(resend);

    });


    app.get("/reportHtml/:name", async function (req, res, next) {
        const data = {
            filename: req.params.name
        };

        const resend = await getReports(data);
        return res.send(resend);

    });


    app.get("/reports/names", async function (req, res, next) {
        const data = {
            filename: req.params.name
        };


        const resend = await getReportNames(data);
        console.log("reee");
        console.log(resend);
        return res.send(resend);

    });




    app.post("/updateReports", async function (req, res, next) {
        const token = req.headers['sexbomb'];
        
        
        // verify(token, res, next);
        if (verify(token, res , next)) {
            const data = {
                filename: req.body.filename,
                filetext: req.body.file
            };

            

            const resend = await updateMarkdown(data);
            return res.json("Updated");
        }
        return res.json("failed");
        
     

    });

};