const routes = require("./router");

module.exports.registerApplicationRoutes = function (app) {
  for (let uri in routes) {
    app.use(uri, routes[`${uri}`]);
  }
};
