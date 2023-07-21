// imports/requires
const express = require('express');
const path = require('path');
const routes = require('./controller');
const session = require("express-session");
const sequelize = require('./config/connections');
const exphbs = require('express-handlebars');
const hbs = exphbs.create(); 
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// app & PORT
const app = express();
const PORT = process.env.PORT || 3001;


// Creating App Session
const sess = {
  secret: "secret",

  // Configure Cookie
  cookie: {
    maxAge: 1800000, // 30 minutes
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,

  //  Session Store
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Using Sequelize Session
app.use(session(sess));


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
app.set('views', path.join(__dirname, 'views'));

//Listening
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port localhost:${PORT}!`);
    });
  });