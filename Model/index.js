const comment = require('./comment');
const post = require('./post');
const User = require('./user');

/* 

Below we define our associations
prior to export.

*/


comment.belongsTo(post, {
    foreignKey: "post_id"
});


comment.belongsTo(User, {
    foreignKey: 'user_Id',
    onDelete: 'CASCADE'
});


User.hasMany(comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});


User.hasMany(post, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});


post.hasMany(comment, {
    foreignKey: 'post_Id',
    onDelete: 'CASCADE'
});


post.belongsTo(User, {
    foreignKey: 'user_Id',
    onDelete: 'CASCADE'
});


console.log("String from model ", User);

module.exports = {
    User,
    comment,
    post
};