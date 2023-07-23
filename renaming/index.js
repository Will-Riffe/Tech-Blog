const router = require("express").Router();


// API Routes
const apiRoutes = require("./api");
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
  res.status(404).render("404");
});



module.exports = router;