var bodyParser = require('body-parser');

module.exports = function (app) {
  app.use(bodyParser.json()); // parses the incoming data to JSON
  // app.use();
};
