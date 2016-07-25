var model = require('./sequel');

module.exports = {
  get: function(cb) {
    model.weather.findAll()
    .then(function(weather) {
      console.log(weather);
      cb(weather);
    });
  },
  post: function(data) {
    var newWeather = model.weather.build(data); // build + save === create
    newWeather.save().then(function() {
      console.log('check the mysql table now');
    });
  }
};

var data = {
  name: 'Saint Paul',
  description: 'Hot and Dry',
  humidity: 98,
  temp: 87,
};
module.exports.get(console.log);
// module.exports.post(data);