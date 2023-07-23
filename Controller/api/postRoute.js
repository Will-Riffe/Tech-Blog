const router = require("express").Router();
const auth = require("../../utils/authorization");



// Import necessary models
const { Comment, Post, User } = require("../../model");

// Get All Posts
router.get("/", async (req, res) => {
    try {

        // Fetch all posts; associated users and comments
        const postData = await Post.findAll({

            // Includes user model; excludes password
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: "password",
                    },
                },

            /*
                Include comment model, selected attributes; 
                nested user model excluding certain attributes
            */
                {
                    model: Comment,
                    attributes: ["comment", "date_created"],
                    include: {
                        model: User,
                        attributes: {
                            exclude: [
                                "password", "createdAt", "updatedAt"
                            ],
                        },
                    },
                },

            ],
        });


        // Convert Sequelize instance to plain objects
        const posts = postData.map((post) => 
            post.get({ plain: true }));


        if (!posts || posts.length === 0) {
            // No posts? 404 Page
            return res.render("404", {
                message: "No posts found."
            });
        }


        // Sets session to 'loggedIn'; sends posts as JSON response
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(posts);
        });
    } catch (err) {
        // If an error occurs, send a 500 status with an error message
        res.status(500).json({ 
            message: 
            "69" });
      }      
});





// Get One post
router.get("/:id", async (req, res) => {
    try {

        const id = req.params.id;
        // Fetch one post, with associated user and comments
        const postData = await Post.findOne({

            attributes: {
                exclude: ["password"],
            },

            where: {
                id: id,
            },

            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Comment,
                    attributes: ["comment", "date_created"],
                    include: {
                        model: User,
                        attributes: {
                            exclude: [
                                "password", "createdAt", "updatedAt"
                            ],
                        },
                    },
                },
            ],
        });

        
        if (!postData) {
            // No posts? 404 Page
            return res.render("404", {
                message: "No posts found."
            });
        }


        // Sets session to 'loggedIn'; sends posts as JSON response
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(postData);
        });
    } catch (err) {
        // If an error occurs, send a 500 status with an error message
        res.status(500).json({ 
            message: 
            "132" });
      }      
});





// Create a post
router.post("/", auth, async (req, res) => {
    console.log("hit new post route")
    try {
        // Create a new post with the provided data
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.userId,
        });
        console.log("testing", post);
        res.json(post);


    } catch (err) {
        // If an error occurs, send a 500 status with an error message
        res.status(500).json({ 
            message: 
            "unable to create post" });
      }      
});




// Update a post
router.put("/:id", auth, async (req, res) => {
    try {
        const postData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.session.userId,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );


        if (postData[0] === 0) {
            // No rows updated? 404 page
            return res.render("404", {
                message: "No posts found."
            });
        }


        // Sets session to 'loggedIn'; sends posts as JSON response
        req.session.save(() => {
            req.session.loggedIn = true;
            res.json({ message: "updated" });
        });
    } catch (err) {
        // If an error occurs, send a 500 status with an error message
        res.status(500).json({ 
            message: 
            "201" });
      }      
});





// Deletes a post
router.delete("/:id", auth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        }).catch((err) => {
            res.json(err);
            return;
        });


        // If no rows were deleted, render a 404 page
        if (!postData) {
            return res.render("404", {
                message: "No posts found."
            });
        }


        // Set the session to loggedIn and send a success message as JSON response
        req.session.save(() => {
            req.session.loggedIn = true;
            res.json({ message: "deleted" });
        });
    } catch (err) {
        // If an error occurs, send a 500 status with an error message
        res.status(500).json({ 
            message: 
            "240" });
      }      
});




module.exports = router;