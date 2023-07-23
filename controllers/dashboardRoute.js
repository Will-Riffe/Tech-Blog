const router = require("express").Router();
const { Comment, Post, User } = require("../models");
const sequelize = require("sequelize");
const auth = require("../utils/authorization");

// Loads the dashboard view
router.get("/", auth, async (req, res) => {
  try {
    // Fetch all posts; associated users and comments
    const postData = await Post.findAll({
      where: {
        user_id: req.session.userId,
      },
    });

    // Retrieve plain user data object
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render dashboard view w/ user data
    res.render("dashboard", {
      active: { dashboard: true },
      posts,
      loggedIn: req.session.loggedIn,
      userName: req.session.userName,
    });
  } catch (err) {
    // Handle server error
    console.error("Error in loading dashboard:", err);
    res.render("error", {
      message: "An error occurred. Please try again later.",
    });
  }
});




// Edit Post Route
router.get("/edit-post/:id", auth, async (req, res) => {
  try {
    // Fetch post data along with associated user and comments
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name", "id"],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "date_created"],

          include: {
            model: User,
            attributes: ["name", "id"],
          },
        },
      ],
    });

    // Checks for the post
    if (!postData) {
      // No Post? 404 page
      return res.render("404", {
        message: "That post isn't here...",
      });
    }

    // Retrieve plain post data object
    const post = postData.get({ plain: true });

    // Render the editPost page with post data
    res.render("editPost", {
      post,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn,
      active: { dashboard: true },
    });
  } catch (err) {
    // Handle server error
    console.error("Error editing Post:", err);
    res.render("error", {
      message: "An error occurred editing this post. Please try again later.",
    });
  }
});

module.exports = router;
