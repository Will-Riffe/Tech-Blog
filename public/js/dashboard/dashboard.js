
/* 
    General Function for the Dashboard
    This function initializes the Post Update Request
 */

function initPostUpdate() {


    // Retrieves Form Values 
    const updatedTitle =
        document.querySelector(".edit-post-title")
            .value;

    const updatedComment =
        document.getElementById("editPostContent")
            .value;


    // Gets User Id
    const userId = parseInt(
        document.querySelector(".post-user")
            .getAttribute("value"));


    // Get Post Id
    const postId = parseInt(
        document.querySelector(".editing-post-title")
            .getAttribute("value"));


    // Calls the updatePost func
    updatePost(
        updatedTitle, updatedComment, userId, postId
    );


    // Comment Update Request Code
    function initCommentUpdate() {

        // Form values
        const editComment = 
            document.getElementById("editingComment")
            .value;

        // User Id
        const userId = parseInt(
            document.querySelector(".comments-user")
            .getAttribute("value"));

        // Comment Id
        const commentId = parseInt(
            document.querySelector(".modify-comment-id")
            .getAttribute("value"));


        updateComment(editComment, userId, commentId);


        // Function to clear all forms
        function clearForms() {
            // Mod Post Page
            const editedPostSubject = 
                document.querySelector(
                ".mod-dashboard-post-create-title"
            );

            const editedPostComment = 
                document.getElementById(
                    "updatePostMessage"
            );

            // Check if the elements exist before trying to clear them
            if (editedPostSubject) {
                editedPostSubject.value = "";
            }

            if (editedPostComment) {
                editedPostComment.value = "";
            }
        }
    }
}