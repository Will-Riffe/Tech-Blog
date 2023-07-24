// Blog Post Container
const postArticles = document.querySelectorAll(".home-container");

// Blog-Post Comment Container
const commentSections = document.querySelectorAll(".comment-section");

// Check if Null
if (postArticles) {
  postArticles.forEach((postArticle) => {
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
        postArticles.forEach((article) => {
          article.style.display = "none";
        });
        commentSections.forEach((section) => {
          section.style.display = "none";
        });
        document.querySelector(".post-page").style.display = "block";

        // Updates the displayed posts' values
        const updatePostValues = document.querySelector(".displayed-post");

        updatePostValues.querySelector(".post-title").textContent = post.querySelector(".post-title").textContent;
        updatePostValues.querySelector(".post-content").textContent = post.querySelector(".post-content").textContent;
        updatePostValues.querySelector(".post-user").textContent = post.querySelector(".post-user").textContent;
        updatePostValues.querySelector(".post-date").textContent = post.querySelector(".post-date").textContent;

        // Update the link for viewing the full post
        const displayPostLink = document.getElementById("fullPostPage");
        displayPostLink.href = `/dashboard/post/${postId}`;

        // Fetch comments for the picked post
        getComments(postId);
      }
    });
  });
}
