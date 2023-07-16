const sequelize = require("../config/connection");
const { comment, post, user } = require("../models");

// Imports seed data for users, posts, and comments
const userSeed = require("./users.json");
const postSeed = require("./posts.json");
const commentSeed = require("./comments.json");



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
    const createdUsers = await user.bulkCreate(userSeed, {
      individualHooks: true,
      returning: true,
    });

    const createdPosts = await post.bulkCreate(postSeed, {
      individualHooks: true,
      returning: true,
    });

    const createdComments = await comment.bulkCreate(commentSeed, {
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
