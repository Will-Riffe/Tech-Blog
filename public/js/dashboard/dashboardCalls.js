


// Function to update a post
async function updatePost(title, content, userId, postId) {
    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          title,
          content,
          user_id: userId
        })
      });
  
      const data = await response.json();
  
      // If post is updated successfully, redirect to the dashboard
      if (data.message === "updated") {
        window.document.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }
  


  
// Function to delete a post
async function deletePost(postId) {
    try {

      const response = await fetch(
        `/api/post/${postId}`, { method: "DELETE" });

      const data = await response.json();
  
    /*  
        If post is deleted successfully, redirect to the dashboard 
        and enable the delete button
    */
      if (data.message === "deleted") {
        window.document.location.href = "/dashboard";
        deletePostBtn.removeAttribute("disabled");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }
  

  


// Function to update a comment
async function updateComment(comment, userId, commentId) {
    try {
      const response = await fetch(
        `/api/comment/${commentId}`, 
        {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          comment,
          user_id: userId
        })
      });
  
      const data = await response.json();
  
      // If comment is updated successfully, redirect to the dashboard
      if (data.message === "updated") {
        // Redirect to the dashboard without any delay
        window.document.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  }
  
  



// Function to delete a comment
async function deleteComment(commentId) {
    try {

      const response = await fetch(
        `/api/comment/${commentId}`, 
        { method: "DELETE" });

      const data = await response.json();
  
    /* 
      If comment is deleted successfully, redirect to the 
      dashboard and enable the delete button
    */
      if (data.message === "deleted") {
        window.document.location.href = "/dashboard";
        deleteCommentBtn.removeAttribute("disabled");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }