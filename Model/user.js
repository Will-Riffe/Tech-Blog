const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connections');

class user extends Model {
    checkPassword(loginpw) {
        return bcrypt.compareSync(loginpw, this.password);
    }
}

user.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },


        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },


        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },


        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 8,
            },
        }
    },

    // the hook checks if the user is correct via the password.
    {

        hooks: {
            beforeCreate: hashUserPassword,
            beforeUpdate: hashUserPassword,
        },

        // Calls Seq. provides model name, adjusts the style in the db.
        sequelize,
        modelName: "user",
        freezeTableName: true,
        underscored: true,

    }
);

// our hook definition, defined outside of the scope its used.
async function hashUserPassword(user) {
    user.password = await bcrypt.hash(user.password, 10);
    return user;
}

module.exports = user;
