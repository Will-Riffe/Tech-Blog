const router = require("express").Router();
const { comment, post, user } = require("../../model");



// Fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await user.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});




// Fetch single user by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await user.findOne({
      attributes: {
        exclude: ["password"],
      },
      where: { id },
      include: [
        {
          model: post,
          attributes: [
            "id", "title", "content", "date_created"
        ],
        },
        {
          model: comment,
          attributes: ["id", "comment", "post_id", "date_created"],
          include: {
            model: post,
            attributes: ["title"],
          },
        },
      ],
    });

    if (!user) {
      // If user not found, render 404 page
      return res.render("404", { 
        layout: "blank",
        message: "No user found."
       });
    }

    res.json(user);
} catch (err) {
    // If an error occurs, send a 500 status with an error message
    res.status(500).json({ 
        message: 
        "Oops! The server goofed! Please try again later." });
  }      
});





// User Login
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;
    const user = await user.findOne({ where: { email } });

    if (!user) {
      // If user not found, render signUp page
      return res.render("signUp");
    }

    const isValidPassword = await user.checkPassword(password);

    if (!isValidPassword) {
      return res.status(400).json({ 
        layout: "blank",
        message: "Adjust your credentials."
       });
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = user.id;
      req.session.userName = user.name;
      res.redirect("/");
    });


} catch (err) {
    // If an error occurs, send a 500 status with an error message
    res.status(500).json({ 
        message: 
        "Oops! The server goofed! Please try again later." });
  }      
});





// Sign up new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checks if user already registered
    const existingUser = await user.findOne({ where: { email } });

    if (existingUser) {
      return res.json({ 
        message: "Email must be unique" });
    }

    const newUser = await user.create({ name, email, password });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = newUser.id;
      req.session.userName = newUser.name;
      res.status(200).json({ message: "user Created!", user: newUser });
    });


} catch (err) {
    // If an error occurs, send a 500 status with an error message
    res.status(500).json({ 
        message: 
        "Oops! The server goofed! Please try again later." });
  }      
});






// POST: user Logout
router.post("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    // If the user is logged in, destroy the session
    req.session.destroy(() => {
      res
        .status(200)
        .json({ message: "You're now logged out!" })
        .end();
    });
  } else {
    // If there's no session, send back 404

    return res.status(400).json({ 
        layout: "blank",
        message: "Something went wrong..."
       });
    }  
});

module.exports = router;
