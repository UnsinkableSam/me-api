
var dbFunctions = require("../../src/db.js");






module.exports = (app) => {
    app.post("/reports", async function (req, res, next) {
        const token = req.headers['sexbomb'];
        let status;
        let msg;
       console.log(req.body);
        // (req, res, next) => verify(token, res, next);
        const verified = verify(token, res, next);
        verified.then( (result) => {
            console.log("hello");
            
              
                const data = {
                    filename: req.body.filename,
                    file: req.body.file
                };


                
                
                let promise = saveReport(data);
                promise.then(function (value) {
                    msg = value;
                    status = 200;
                }).catch(error => {
                    msg = "missing authentication";
                    status = 500;
                });
                return res.status(status).json(msg);
            
            
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