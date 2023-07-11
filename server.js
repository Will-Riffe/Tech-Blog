// imports/requires
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');


// app & PORT
const app = express();
const PORT = process.env.PORT || 3001;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routing
app.use(routes);



// anticipating possible handlebars



//Listening
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  });