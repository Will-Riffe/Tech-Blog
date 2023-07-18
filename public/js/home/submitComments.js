

// Function refreshing presented comments
function refreshComments() {
  const commentContents = 
    document.querySelectorAll(".comment");

  if (commentContents.length > 0) {
    commentContents.forEach((commentElement) => {
      commentElement.remove();
    });
  }
}





// API call to submit comment to a post
async function addPostComment(comment, userId, postId) {
    try {


      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: comment,
          user_id: userId,
          post_id: postId
        })
      });
  

      if (res.ok) {
        // Comment added; update comments
        refreshComments();
        getCommentsForPost(postId);
      } else {
        // Handle API call error immediately
        console.error("Error: comment not sent.");
      }


    } catch (err) {
      // Handle fetch or other error immediately
      console.error(
        "An error has occured"
    );
  }
}
  




// Comment submital logic
async function doCommentSubmit() {
    // Retriev user's comment
    const comment = document
        .getElementById(
          "postComment"
          ).value
    ;
  

    // Checks if comment input field is empty
    if (!comment.trim()) {
      alert("Can't submit Empty comment!");
      return;
    }
  

    // Retrieves post ID from the specific post for the comment data
    const postId = parseInt(
            document.querySelector(".picked")
            .getAttribute("value"))
    ;
  

    // Retrieve user ID to complete the API call
    const userId = parseInt(
            document.querySelector(".home-hello-user")
            .getAttribute("value"))
    ;
  

    // Calls addPostComment to add the respective comment
    try {
      await addPostComment(comment, userId, postId);
    } catch (error) {
      // Handle any errors that occur during the API call
      alert("Error adding Comment to Post...");
    }
  
    // Clears text input after submission
    document.getElementById("commentInput").value = "";
}
  



// Comment submission event handling for both desktop and mobile
const postCommentBtn = document.getElementById("postCommentBtn");
const postComment = document.getElementById("postComment");

if (postCommentBtn && postComment) {
    postCommentBtn.addEventListener("click", addPostComment);
    postComment.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      handleCommentSubmission();
    }
  });
}
