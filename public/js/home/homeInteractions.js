


// Blog Post Container
const postArticle = 
    document.querySelector(
        ".home-container"
);

// Blog-Post Comment Container
const commentSection = 
    document.querySelector(
        ".comment-section"
);



// All posts 
const posts = document.querySelectorAll(".public-post");



// Check if Null 
if (postArticle) {
    postArticle.addEventListener("click", async (e) => {
    removePicked();
    const post = e.target;
    const welcomeUser = document.querySelector(".welcome-user");

    if (!welcomeUser) {
      const confirmed = window.confirm("Sign in first or get lost!");
      
      if (confirmed) {
        window.document.location.href = "/login";
      } else {
        return;
      }
    }

    if (e.target.classList.contains("public-post")) {
      const postId = post.getAttribute("value");

      // Stashes home view, displays individual post
      postArticle.style.display = "none";
      commentSection.style.display = "none";
      document.querySelector(".post-page").style.display = "block";

      // Updates the displayed posts' values
      const updatePostValues = document.querySelector(".displayed-post");
      
      updatePostValues.querySelector(".post-title")
        .textContent = post.querySelector(".post-title").textContent;

      updatePostValues.querySelector(".post-content")
        .textContent = post.querySelector(".post-content").textContent;

      updatePostValues.querySelector(".post-user")
        .textContent = post.querySelector(".post-user").textContent;

      updatePostValues.querySelector(".post-date")
        .textContent = post.querySelector(".post-date").textContent;
      
      // Update the link for viewing the full post
      const displayPostLink = document.getElementById("fullPostPage");

            displayPostLink.href = `/dashboard/post/${postId}`;

      // Fetch comments for the picked post
      getComments(postId);
    }
  });
}
