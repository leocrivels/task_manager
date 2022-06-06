const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
const db = {};

mongoose.Promise = global.Promise;

db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model.js")(mongoose);
db.projects = require("./project.model.js")(mongoose);
db.tasks = require("./task.model.js")(mongoose);

module.exports = db;