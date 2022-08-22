const express = require("express");
const mongoose = require("./db/db");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/products", require("./routes/productRoutes"));
PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running at : ${PORT}`));
module.exports = app;
