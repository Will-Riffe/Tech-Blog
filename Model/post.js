const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections");
const User = require("./user");

class Post extends Model { }

Post.init(
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },


      date_created: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },


      post_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },


      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },


      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "user_id"
        }
      },
    },

    {
        sequelize,
        modelName: "Post",
        freezeTableName: true,
        underscored: true,
      }
      
  );

module.exports = Post;