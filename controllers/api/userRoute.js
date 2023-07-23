const router = require("express").Router();
const { Comment, Post, User } = require("../../rename");



// Fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});




// Fetch single user by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      attributes: {
        exclude: ["password"],
      },
      where: { id },
      include: [
        {
          model: Post,
          attributes: [
            "id", "title", "content", "date_created"
        ],
        },
        {
          model: Comment,
          attributes: ["comment", "post_id", "date_created"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
      ],
    });

    if (!user) {
      // If user not found, render 404 page
      return res.render("404", { 
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
    const user = await User.findOne({ where: { email : req.body.email } });
    
    if (!user) {
      // If user not found, respond with a JSON error message
      return res.status(404).json({ message: "User not found. Please sign up." });
    }

    const isValidPassword = user.checkPassword(req.body.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = user.id;
      req.session.userName = user.name;
      res.json({ message: "Login successful.", user });
    });
  } catch (err) {
    // If an error occurs, send a 500 status with an error message
    res.status(500).json({ message: "This is from userRoute" });
  }
});






// Sign up new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checks if user already registered
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.json({ 
        message: "Email must be unique" });
    }

    const newUser = await User.create({ name, email, password });

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
