const authenticateUser = (req, res, next) => {

//  Check if the user is logged in (loggedIn property)
    if (!req.session.loggedIn) {
      // If not, we redirect them to login
      res.redirect("/login");
    } else {
      // If logged in, proceed next middleware/route handler
      next();
    }
  };
  
  module.exports = authenticateUser;
  