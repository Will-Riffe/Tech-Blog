const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class post extends Model { }

post.init(
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
          model: "user",
          key: "id"
        }
      },
    },

    {
        sequelize,
        modelName: "post",
        freezeTableName: true,
        underscored: true,
      }
      
  );

module.exports = post;