const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");
// const middleware = require("./middlewares/common");
const Database = require("./database");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
// app.use(...middleware);

router.registerApplicationRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  new Database().connect().then(() => {
    console.log("DB Connected");
  });
});
