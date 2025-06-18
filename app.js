const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");
const middleware = require("./middleware/common");
const Database = require("./database");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(...middleware);
app.options("*", cors());

router.registerApplicationRoutes(app);

new Database().connect().then(() => {
  console.log("Database Connected");
});

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

module.exports = app;
