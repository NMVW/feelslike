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
