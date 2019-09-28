
var dbFunctions = require("../../src/db.js");






module.exports = (app) => {

    app.post("/reports", (req, res, next) => verify(req, res, next), (req, res) => { 
              const data = {
                    filename: req.body.filename,
                    file: req.body.file
                };
            console.log(data);




            saveReport(data).then(function (value) {
                    console.log(value);
                    // msg = value;
                    // status = 200;
                    return res.status(200).json("Success");

                }).catch(error => {
                    console.log(error);
                    return res.status(500).json("missing authentication");


                });
    });

    // app.post("/reports", async function (req, res, next) {
    //     const token = req.headers['sexbomb'] ;
        
    //    console.log(req.body);
        
        // verify(token, res, next).then( async (result) => {
        //    console.log(result);
        //     let status = 500;
        //     let msg = "hello";
              
        //         const data = {
        //             filename: req.body.filename,
        //             file: req.body.file
        //         };
        //     console.log(data);

                
            
               
        //     saveReport(data).then(function (value) {
        //             console.log(value);
        //             // msg = value;
        //             // status = 200;
        //             return res.status(200).json({"hej": "hej"});
                    
        //         }).catch(error => {
        //             msg = "missing authentication";
        //             status = 200;
        //             console.log(error);
                    
                    
        //         });
                
            
            
        //     // 
            
        // })
        
       
            
  


    // });



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



    app.post("/updateReports", (req, res, next) => verify(req, res, next), (req, res) => { 
    // app.post("/updateReports", async function (req, res, next) {
        const token = req.headers['sexbomb'];
        
        


       
            const data = {
                filename: req.body.filename,
                filetext: req.body.file
            };
            updateMarkdown(data);
            status = 200;
            msg = "Updated";
       
       
        
     
        return res.status(status).json(msg);
        
    });

    
};