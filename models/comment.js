const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const Post = require("./post");
const User = require("./user");

class Comment extends Model {}

Comment.init(
    {
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      date_created: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id"
        }
      },

      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Post,
          key: "id"
        }
      }
    },

    /* 
        Ref. the Sequelize instance for the db connection.
        Then provides model name, adjusts the style in the db.
    */
    {
      sequelize,
      modelName: "Comment",
      freezeTableName: true,
      underscored: true,
      deletedAt: true
    }


  );
  
  module.exports = Comment;