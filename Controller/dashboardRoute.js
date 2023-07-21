const router = require("express").Router();
const { Comment, Post, User } = require("../model");
const sequelize = require("sequelize");
const auth = require("../utils/authorization");


// Loads the dashboard view
router.get("/", auth, async (req, res) => {
  try {

    // Fetch all posts; associated users and comments
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Post,
          attributes: [
            "id", "title", "content", "date_created", "user_id"
        ],
          order: [[sequelize.literal("id"), "DESC"]],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "date_created"],
          include: {
            model: User,
            attributes: { exclude: ["password"] },
          },
        },
      ],
    });



    // Checks for user data
    if (!userData) {
      // No user data? 404 view
      return res.render("404", { 
        message: "No user data"
      });
    }



    // Retrieve plain user data object
    const user = userData.get({ plain: true });



    // Render dashboard view w/ user data
    res.render("dashboard", {
      user,
      loggedIn: req.session.loggedIn,
      active: { dashboard: true },
    });
  } catch (err) {
    // Handle server error
    console.error(
        "Error in loading dashboard:"
    , err);
    res.render("error", 
        { message: 
            "An error occurred. Please try again later." 
         });
    }
});



// View Specific Post
router.get("/post/:id", auth, async (req, res) => {
  try {

    // Fetch post data; associated user and comment data
    const postData = await post.findByPk(req.params.id, {

      attributes: [
        "id", "title", "content", "date_created"
        ],

      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },

        {
          model: Comment,
          attributes: ["comment", "date_created"],
          include: {
            model: User,
            attributes: { exclude: ["password"] },
          },
        },
        
      ],
    });



    // Checks for post data
    if (!postData) {
      // No Post data? 404 View
      return res.render("404", { 
        message: "No Post Data",
      });
    }



    // Retrieve plain Post data object
    const post = postData.get({ plain: true });



    // Render the viewPost page with post data
    res.render("viewPost", {
      post,
      loggedIn: req.session.loggedIn,
      active: { dashboard: true },
    });
    } catch (err) {
        // Handle server error
        console.error(
            "Error in loading post:"
        , err);
        res.render("error", 
            { message: 
                "An error occurred fetching this post. Please try again later." 
            });
        }
});






// Edit Post Route
router.get("/edit-post/:id", auth, async (req, res) => {
  try {

    // Fetch post data along with associated user and comments
    const postData = await post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name", "id"],
        },
        {
          model: Comment,
          attributes: [
            "id", "comment", "date_created"
            ],

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
    console.error(
        "Error editing Post:"
    , err);
    res.render("error", 
        { message: 
            "An error occurred editing this post. Please try again later." 
        });
    }
});





// Route to edit a comment
router.get("/edit-comment/:id", auth, async (req, res) => {
  try {
    // Retrieve comment ID from request params
    const id = req.params.id;

    // Fetch comment data w/ associated post and user data
    const commentData = await comment.findByPk(id, {
      include: [
        {
          model: Post,
        },
        {
          model: User,
        },
      ],
    });


    // Check if comment data exists
    if (!commentData) {
      // No comment data? 404 View
      return res.render("404", { 
        message: "No comment data..."
       });
    }


    // Retrieve plain comment data object
    const comment = commentData.get({ plain: true });


    // Render the editComment page w/ comment data
    res.render("editComment", {
      comment,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn,
      active: { dashboard: true },
    });
} catch (err) {
    // Handle server error
    console.error(
        "Error editing comment:"
    , err);
    res.render("error", 
        { message: 
            "An error occurred editing this comment. Please try again later." 
        });
    }
});




module.exports = router;