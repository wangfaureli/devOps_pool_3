'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Clock, {
        foreignKey: 'userId',
        as: 'clocks',
        onDelete: 'CASCADE',
      });
      User.hasMany(models.WorkingTime, {
        foreignKey: 'userId',
        as: 'workingtimes',
        onDelete: 'CASCADE',
      });
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
        onDelete: 'CASCADE',
      });
      User.belongsToMany(models.Team, {
        through: 'userTeam',
        as: 'teams',
        foreignKey: 'User_userId',
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      birthday: DataTypes.DATE,
      roleId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
