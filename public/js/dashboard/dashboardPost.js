

// Dashboard Post Frontend JS

// Get the pastPosts element
const pastPosts = document.
    getElementById("pastPosts");

if (pastPosts) {

  // Click event listener to pastPosts
  pastPosts.addEventListener("click", (e) => {
    let clickedEl = e.target;
    // Check if the clicked element has the class "fa-pen-to-square"
    if (clickedEl.classList.contains("fa-pen-to-square")) {



      // Retrieve Post ID and user ID
      let postId = parseInt(
        clickedEl.parentElement.getAttribute("value"));

      let userId = parseInt(
        document.getElementById("userName")
                .getAttribute("value"));
                
      let doubleCheckUser = parseInt(e.target.getAttribute("value"));



      // Validate user authorship
      if (userId === doubleCheckUser) {
        // Redirect user to comment editing view
        window.document.location.href = `/dashboard/edit-post/${postId}`;
      } else {
        // If the user is not the author, nothing happens
        return;
      }
    }
  });
}




// Edit Button Association 
const editPostView = document.querySelector(".edit-post");
const currentPost = document.querySelector(".post-user");

// Extract editPostViewID and currentPostId
const editPostViewId = editPostView ? 
    parseInt(editPostView.getAttribute("value")) : null;

const currentPostId = currentPost ? 
    parseInt(currentPost.getAttribute("value")) : null;



// Hide or display post edit buttons based on user authorization
if (editPostViewId !== currentPostId) {
  const alterationContainer = document.
    querySelector(".alteration-container");

  if (alterationContainer) {
    alterationContainer.style.display = "none";
  }
} else {
  const alterationContainer = document.
    querySelector(".alteration-container");

  if (alterationContainer) {
    alterationContainer.style.display = "flex";
  }

  const editPostBtn = document.getElementById("editPostBtn");

  if (editPostBtn) {
    const updateForm = document.querySelector(".edit-post-container");
    editPostBtn.addEventListener("click", () => {
      // Toggle the display of the post update form
      if (editPostBtn.value === "Edit") {
        editPostBtn.value = "Hide Form";
        updateForm.style.display = "flex";
      } else {
        editPostBtn.value = "Edit";
        updateForm.style.display = "none";
      }
    });
  }



  // Update Button
  const submitPostUpdate = document.
    getElementById("submitPostUpdate");

  const editPostContent = document.
    getElementById("editPostContent");

  if (submitPostUpdate) {
    submitPostUpdate.addEventListener("click", (e) => {
      // Prevent form submission and call the initPostUpdate function
      e.preventDefault();
      initPostUpdate();
      clearForms();
    });
  }

  if (editPostContent) {
    editPostContent.addEventListener("keyup", function (e) {
      if (e.key === "Enter") {
        // Call the initPostUpdate function on pressing Enter
        initPostUpdate();
        clearForms();
      }
    });
  }



  // Delete Button
  const deletePostBtn = document.getElementById("deletePostBtn");

  if (deletePostBtn) {
    deletePostBtn.addEventListener("click", () => {
      // Disable the delete button to avoid multiple clicks
      deletePostBtn.setAttribute("disabled", "");

      const postIdEl = document.querySelector(".editing-post-title");
      if (postIdEl) {
        const postId = parseInt(postIdEl.getAttribute("value"));
  
        // Call the deletePost function
        deletePost(postId, () => {
          // Re-enable the delete button after the deletion process is completed
          deletePostBtn.removeAttribute("disabled");
  
          // Optionally show a success message
          // You can replace this with your preferred success message display method
          alert("Post Deleted!");
        });
      }
    });
  }
}



async function createPost(event) {
  event.preventDefault();

  const title = document.querySelector(`input[name="title"]`).value.trim();
  const content = document.querySelector(`textarea[name="content"]`).value.trim();
  if (title && content) {
    await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content
      }),
      headers: { 'Content-Type': 'application/json' }
    });

      document.location.replace('/dashboard');

  }
}

document.querySelector('#post-form').addEventListener('submit', createPost);