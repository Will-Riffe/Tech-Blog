// Sign Up Routes
const router = require("express").Router();




// Route displaying the sign-up form
router.get("/", async (req, res) => {
  try {

    // Renders the signup page, which displays the sign-up form
    res.render("signup");

  } catch (err) {
    // If an error occurs, handle it and return a user-friendly error response
    console.error("Error while rendering sign-up form:", err);
    res.status(500).render("error", {
      message: 
      "Error loading the sign-up form. Please try again later.",
    });
  }
});




// Route for successful sign-up page
router.get("/success", async (req, res) => {
  try {
    /* 
        Renders "successful" view with the logged-in variable passed 
        as data. The logged-in variable is used to display conditional 
        content based on user authentication status
    */
     res.render("signupSuccess", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    /* 
        If an error occurs, a user-friendly error response appears
    */
    console.error("Error while rendering successful sign-up page:", err);
    res.status(500).render("error", {
      message: 
      "Sign-up Error. Please try again later.",
    });
  }
});

module.exports = router;
