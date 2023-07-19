const sequelize = require("../config/connections");
const { comment, post, user } = require("../model");

// Imports seed data for users, posts, and comments
const userSeed = require("./001-users.json");
const postSeed = require("./002-posts.json");
const commentSeed = require("./003-comments.json");



// async function for seeding the db
const seedDatabase = async () => {
  try {


/*
    Synchronizes db by creating tables based on defined models. 
    `force: true` option will drop the existing tables before 
    recreating them.
*/
    await sequelize.sync({ force: true });


/* 
    bulkCreate userSeeds data enables individual hooks for each record.
    individualHooks will trigger model lifecycle methods— automatic
    execution of custom logic. The same is done for posts, and comments.
*/

    await user.bulkCreate(userSeed, {
        individualHooks: true,
        returning: true,
    });


    await post.bulkCreate(postSeed, {
        individualHooks: true,
        returning: true,
    });

    await comment.bulkCreate(commentSeed, {
        individualHooks: true,
        returning: true,
    });


    // If complete, the script can exit successfully.
    console.log("Database successfully seeded!");
    process.exit(0);
  } catch (error) {
    // If any error occurs during the seeding process, log the error and exit with a failure code.
    console.error("Error seeding the database:", error);
    process.exit(1);
  }
};

// Call the seedDatabase function to start the seeding process.
seedDatabase();
