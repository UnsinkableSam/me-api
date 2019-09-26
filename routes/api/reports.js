
var dbFunctions = require("../../src/db.js");






module.exports = (app) => {
    app.post("/reports", async function (req, res, next) {
        // const token = req.headers['sexbomb'];
        const token = "hello";
        // (req, res, next) => verify(token, res, next);
        const verified = verify(token, res, next);
        verified.then( (result) => {
            
            if (result) {
                console.log(result);

                const data = {
                    filename: req.body.filename,
                    file: req.body.file
                };


                
                
                let promise = saveReport(data);
                promise.then(function (value) {
                    return res.status(200).json(value);
                }).catch(error => {
                    return res.status(500).json("missing authentication");
                });
                
            } 
            
            // 

        })
        
        
            
        // }
       
        


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