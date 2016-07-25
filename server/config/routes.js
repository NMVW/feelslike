
module.exports = function (app) {
  
  app.get('/weather', function(req,res) {
    // res.send('this is GET weather');
    db.get(function(data) {
      // res.send(data);
      res.send(data);
    });
  });

  app.post('/weather', function(req,res) {
    res.send('this is POST weather');
    // db.post();
  });
  
};
