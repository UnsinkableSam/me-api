const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");




const app = express();
const port = 1337;

app.use(cors());


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 


//routes
require('./routes')(app);

if (process.env.NODE_ENV !== "test") {
 
  app.use(morgan("combined")); 
}


// Start up server

const server = app.listen(port, () => console.log(`Example API listening on port ${port}!`));


app.all('/**', (req, res, next)  => {
  return res.status(404).json(`Sorry can't find route ${req.url}!`)
});


module.exports = server;