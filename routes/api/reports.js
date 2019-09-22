






module.exports = (app) => {
    app.post("/addReports/", async function (req, res, next) {
        const token = req.headers['sexbomb'];
        if (verify(token, res)) {
            const data = {
                filename: req.body.filename,
                file: req.body.file
            };
            saveReport(data, res);
            
        }
        


    });



    app.get("/reports/week/:name", async function (req, res, next) {
        const data = {
            filename: req.params.name
        };

        const resend = await getTextMarkdown(data);
        return res.send(resend);

    });


    app.get("/reportHtml/:name", async function (req, res, next) {
        const data = {
            filename: req.params.name
        };

        const resend = await getReports(data);
        return res.send(resend);

    });


    app.get("/reports", async function (req, res, next) {
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
        verify(token, res);
        if (verify(token, res)) {
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