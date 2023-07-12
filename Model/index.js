const comment = require('./comment');
const post = require('./post');
const user = require('./user');

/* 

Below we define our associations
prior to export.

*/


comment.belongsTo(post, {
    foreignKey: "post_id"
});


comment.belongsTo(user, {
    foreignKey: 'user_Id',
    onDelete: 'CASCADE'
});


user.hasMany(comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});


user.hasMany(post, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});


post.hasMany(comment, {
    foreignKey: 'post_Id',
    onDelete: 'CASCADE'
});


post.belongsTo(user, {
    foreignKey: 'user_Id',
    onDelete: 'CASCADE'
});




module.exports = {
    user,
    comment,
    post
};