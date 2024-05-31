module.exports = {
  "/api/user": require("./admin"),
  "/api/category": require("./category"),
  "/api/project": require("./project"),
  // "/api/application": require("./application"),
  "/api/application/": require("./application"),
};
