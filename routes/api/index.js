




module.exports = (app) => {
  app.get("/", function (req, res, next) {
    const data = {
      data: {
        msg: "Hello World"
      }
    };

    res.json(data);
  });

};



