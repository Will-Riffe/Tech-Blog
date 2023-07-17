


async function getComments(postId) {

    // Checks for valid comment ID
    if (typeof postId !== "number") {
        console.log(
            "Comment ID Invalid; not a number"
        );
        return;
    }



    document.
        querySelector(".preloader-comments")
        .style.display = "block"
    ;

    const commentContainer =
        document
            .querySelector(".comment-container")
    ;


    const comment =
        document
            .querySelectorAll(".comment");

    if (comment.length > 0) {
        comment.forEach((com) => com.remove());
    }



    try {
        const response = await fetch(`/api/post/${postId}`, {
            method: "GET",
        });


        const postData = await response.json();
        const comments = postData.comments;


        if (!comments || comments.length === 0) {
            const subTxt = 
                document.querySelector(
                    ".empty-comment-history");

            subTxt.style.display = "block";
            
            setTimeout(() => {
                subTxt.style.display = "none";
            }, 2500);
        }


        comments.forEach((com) => {
            // Destructure API data
            const { id, 
                    comment: text, 
                    user: { name: user }, 
                    date_created: date } = com;


            // Creates Elements for the page
            const commentSectionDiv = document.createElement("section");
            const commentContentDiv = document.createElement("div");
            const commentFooterDiv = document.createElement("div");
            const userRefP = document.createElement("p");
            const commentDateP = document.createElement("p");
            const commentHr = document.createElement("hr");

            // Adding classes to new Elements
            commentSectionDiv.classList.add("comment-section");
            commentSectionDiv.setAttribute("value", id);
            commentContentDiv.classList.add("comment-content");
            commentFooterDiv.classList.add("comment-footer");
            userRefP.classList.add("user-reference");
            commentDateP.classList.add("comments-date");

            // Fill Elements with data
            commentContentDiv.textContent = text;
            userRefP.textContent = user;
            commentDateP.textContent = date;

            // Append to parent
            commentSectionDiv.appendChild(commentContentDiv);
            commentSectionDiv.appendChild(commentFooterDiv);

            // Append to bottom parent
            commentFooterDiv.appendChild(commentHr);
            commentFooterDiv.appendChild(userRefP);
            commentFooterDiv.appendChild(commentDateP);

            // Append to Core parent
            commentContainer.appendChild(commentSectionDiv);
        });

        document.querySelector(".preloader").style.display = "none";
    } catch (err) {
        console.log(err);
    }
}
