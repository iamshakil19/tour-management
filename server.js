const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
mongoose.set("strictQuery", true);
const app = require("./app");

/*
database connection
 */
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log("Database connection is successful".cyan.bold);
});

/* 
server
*/
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.cyan.bold);
});

app.use("*", (req, res) => {
  res.status(404).send({
    success: false,
    message: "No route found",
  });
});
