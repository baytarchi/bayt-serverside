const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");
const middleware = require("./middleware/common");
const Database = require("./database");

require("dotenv").config();

const app = express();

app.use(...middleware);
app.use(bodyParser.json());

router.registerApplicationRoutes(app);

new Database().connect().then(() => {
  console.log("Database Connected");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;
