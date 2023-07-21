const Comment = require('./comment');
const Post = require('./post');
const User = require('./user');

/* 

Below we define our associations
prior to export.

*/


Comment.belongsTo(Post, {
    foreignKey: "post_id"
});


Comment.belongsTo(User, {
    foreignKey: 'user_Id',
    onDelete: 'CASCADE'
});


User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});


User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});


Post.hasMany(Comment, {
    foreignKey: 'post_Id',
    onDelete: 'CASCADE'
});


Post.belongsTo(User, {
    foreignKey: 'user_Id',
    onDelete: 'CASCADE'
});


console.log("String from model ", User);

module.exports = {
    User,
    Comment,
    Post
};