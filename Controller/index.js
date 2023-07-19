const router = require("express").Router();
const apiRoutes = require("./api");


// API Routes
router.use("/api", apiRoutes);


// Dashboard
const dashboardRoute = require("./dashboardRoute");
router.use("/dashboard", dashboardRoute);


// Home 
const homeRoute = require("./homeRoute");
router.use("/", homeRoute);


// Login 
const loginRoute = require("./loginRoute");
router.use("/login", loginRoute);


// Sign-Up
const signUpRoute = require("./signupRoute");
router.use("/sign-up", signUpRoute);


// No Route?!
router.use((req, res) => {
  // Send back 404 page 
  res.render("404", {
    layout: "404",
    message: "That route doesn't exist!"
  });
});



module.exports = router;