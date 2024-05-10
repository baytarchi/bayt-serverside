const mongoose = require("mongoose");
require("dotenv").config();

const host = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.xf0novu.mongodb.net/${process.env.DATABASE}`;

const authentication = {
  readPreference: "primary",
};

class Database {
  constructor() {}

  buildURI() {
    const keys = Object.keys(authentication);
    const arr = keys.map((key) => `${key}=${authentication[key]}`);
    const params = arr.join("&");
    return `${host}?${params}`;
  }

  async connect() {
    let uri = this.buildURI();
    await mongoose.connect(uri);
  }

  disconnect() {
    mongoose.connection.close;
  }
}

module.exports = Database;
