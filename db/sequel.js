var Sequelize = require('sequelize');
// connect to mysql database
var sequelize = new Sequelize('weather','root','');

console.log('connected without error');

// define table schema for Weather
var Weather = sequelize.define('weather', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  humidity: Sequelize.INTEGER(2),
  temp: Sequelize.INTEGER(2),
  tom: Sequelize.INTEGER(2)
});


console.log('created a table schema without error');

// sync database to create/update the table from the schema above
sequelize.sync()
  // table created
  .then(function() {
    // create a weather entry (build + save)
    return Weather.create({
      name: 'Jupiter',
      description: 'Hot and sticky',
      humidity: 98,
      temp: 87,
      // tom: null
    });
  });
  
console.log('synced table to db without error');

exports.weather = Weather;