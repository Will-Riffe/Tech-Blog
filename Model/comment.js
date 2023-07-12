const { Model, DataTypes } = require("sequelize");
const sequelize = require("../Config/connections");

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
          model: "user",
          key: "id"
        }
      },


      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "post",
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
      modelName: "comment",
      freezeTableName: true,
      underscored: true,
      deletedAt: true
    }


  );
  