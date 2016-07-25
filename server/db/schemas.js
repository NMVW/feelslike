var Sequelize = require('sequelize');

// connect to postgres database (include dialects and pooling connection)
var sequelize = new Sequelize('weather', 'root', '');

// define table schema for Weather
var Weather = sequelize.define('weather', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  humidity: Sequelize.INTEGER(2),
  temp: Sequelize.INTEGER(2),
  tom: Sequelize.INTEGER(2)
});

exports.weather = Weather;
