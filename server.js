// imports/requires
const express = require('express');
const routes = require('./Control');
const sequelize = require('./Config/connection');
const exphbs = require('express-handlebars');

// app & PORT
const app = express();
const PORT = process.env.PORT || 3001;


// express middleware functions used to handle JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Routing
app.use(routes);



/*
 Handlebars: configures express for the handlebars 
 template rendering engine.
*/
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Specify path to our views
app.set('View', path.join(__dirname, './View'));

//Listening
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  });