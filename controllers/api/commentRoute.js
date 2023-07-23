const router = require("express").Router();
const Comment = require("../../model");


// Create a Comment
router.post("/", async (req, res) => {
    try {
      const comment = await Comment.create({
        comment: req.body.comment,
        user_id: req.body.user_id,
        post_id: req.body.post_id
      });
  
      // Successfully created the comment, send it as JSON response
      return res.status(201).json({
        status: "success",
        message: "Comment created successfully.",
        data: comment
      });
    } catch (err) {
      // If error occurred while creating the comment
      return res.status(500).json({
        status: "error",
        message: "Oops! commentRoute couldn't create this comment...",
        error: err.message // error message for debugging      
        });
    }
});
  

  

module.exports = router;
