const dotenv = require('dotenv')
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

dotenv.config();
var corsOptions = {
  origin: process.env.ORIGIN_URL || "http://localhost:3000"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Init mongo models
const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require('./routes/auth.routes')(app);
require('./routes/project.routes')(app);
require('./routes/task.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});