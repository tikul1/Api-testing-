const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/Api-testing")
  .then(() => console.log("connect"))
  .catch(() => console.log(err));

module.exports = mongoose;
