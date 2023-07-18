


// Frontend JS for the Dashboard comments
const pastComments = document.
    getElementById("pastComments");


if (pastComments) {

    pastComments.addEventListener("click", (e) => {

        let clickedEl = e.target;

        if (clickedEl.classList.contains("fa-pen-to-square")) {

            let CommentId = parseInt(
                clickedEl.parentElement.getAttribute("value"));

            let userId = parseInt(
                document.getElementById("userName")
                        .getAttribute("value"));

            if (typeof CommentId === "number" && typeof userId === "number") {
                // Redirect to the modify-comment page
                window.document.location.href = 
                `/dashboard/modify-comment/${CommentId}`;
            }
        }
    });
}





// Comment Edit Button
let userCommentViewer = document.querySelector(".edit-comment");
let currentComment = document.querySelector(".comments-user");

let userCommentViewerId;
let currentCommentId;





// Avoid Console Log Errors
if (userCommentViewer) {
    userCommentViewerId = parseInt(
        userCommentViewer.getAttribute("value"));
}

if (currentComment) {
    currentCommentId = parseInt(
        currentComment.getAttribute("value"));
}

if (userCommentViewerId !== currentCommentId) {
    if (document.querySelector(".alteration-container")) {
        document.querySelector(
            ".alteration-container").style.display = "none";
    }

} else {
    if (document.querySelector(".alteration-container")) {
        document.querySelector(
            ".alteration-container").style.display = "flex";
    }

    const editCommentBtn = document.getElementById("editComment");

    if (editCommentBtn) {

        const updateForm = document.querySelector(".updateComment");

        editCommentBtn.addEventListener("click", () => {

            if (editCommentBtn.value == "Edit") {

                editCommentBtn.value = "Hide Form";
                updateForm.style.display = "flex";

            } else {

                editCommentBtn.value = "Edit";
                updateForm.style.display = "none";
            }
        });
    }




    // Update Button
    const submitCommentUpdate = 
        document.getElementById("submitCommentUpdate");

    const editCommentMessage = 
        document.getElementById("editingComment");

    if (submitCommentUpdate) {
        submitCommentUpdate.addEventListener("click", (e) => {

            // Stop Auto Reload 
            e.preventDefault();
            initCommentUpdate();

            clearForms();

        });
    }

    if (editCommentMessage) {
        editCommentMessage.addEventListener("keyup", function (e) {
            if (e.key === "Enter") {
                initCommentUpdate();

                clearForms();
            }
        });
    }




    
    // Delete Button
    const deleteCommentBtn = document.
        getElementById("deleteComment");

    if (deleteCommentBtn) {

        deleteCommentBtn.addEventListener("click", () => {

            deleteCommentBtn.setAttribute("disabled", "");

            // Call the deleteComment function without delay
            deleteComment(parseInt(document.querySelector(
                    ".editing-comments-id")
                    .getAttribute("value")));

        });
    }
}
