const router = require("express").Router();
const Comment = require("../../Model/comment");




// GET All Comments
router.get("/", async (req, res) => {
  try {

    const comments = await Comment.findAll({});

    if (!comments.length) {
        // No Comments? 404 View
      return res.status(404).render("404", {
        layout: "404",
        message: "No comments found."
      });
    }

    // Successfully fetched the comment? Return it as JSON
    return res.status(200).json({
        status: "success",
        message: "Comments successfully fetched.",
        data: comments
      });
  } catch (err) {
    return res.status(500).json({
        status: "error",
        message: "Oops! Something went wrong with the server.",
        error: err.message // error message for debugging
      });  
    }
});




// GET One Comment
router.get("/:id", async (req, res) => {
    try {
      const comment = await Comment.findByPk(req.params.id);
  
      if (!comment) {
        // Comment not found? Return 404 View
        return res.status(404).render("404", {
          layout: "blank"
        });
      }
  
      // Successfully fetched the comment? Return it as JSON
      return res.status(200).json(comment);

    } catch (err) {
      // Error fetching the comment? The following informs the user
      return res.status(500).json({
        status: "error",
        message: "Oops! Something went wrong with the server.",
        error: err.message // error message for debugging
        });
    }
});
  




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
        message: "Oops! Something went wrong while creating the comment.",
        error: err.message // error message for debugging      
        });
    }
});
  




// Update a Comment
router.put("/:id", async (req, res) => {
    try {
      const [updatedRows] = await Comment.update(
        {
          comment: req.body.comment,
          user_id: req.body.user_id,
          post_id: req.body.post_id
        },
        {
          where: {
            id: req.params.id
          }
        }
      );
  
      if (updatedRows === 0) {
        // If no rows were updated, the comment's non-existant
        return res.status(404).json({ 
            message: "Comment not found with the provided ID" });
      }
  
      // Successfully updated the comment
      return res.json({ message: "Comment updated successfully" });

    } catch (err) {
      // If error occurred while updating the comment
      return res.status(500).json({
        status: "error",
        message: 
            "Oops! Something went wrong while updating the comment.",
        error: err.message // error message for debugging      
      });
    }
  });
  




// Delete a Comment
router.delete("/:id", async (req, res) => {
    try {
      const deletedRows = await Comment.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (deletedRows === 0) {
        // If no rows were updated, the comment's non-existant
        return res.status(404).json({ 
          status: "error",
          message: "No comment found with the provided ID" 
        });
      }
  
      // Successful comment deletion
      return res.json({ 
        status: "success",
        message: "Comment deleted successfully" 
      });
    } catch (err) {
      // If an error occurred while deleting the comment
      return res.status(500).json({
        status: "error",
        message: 
        "Oops! Something went wrong while deleting the comment.",
        error: err.message // error message for debugging
      });
    }
  });
  

module.exports = router;
