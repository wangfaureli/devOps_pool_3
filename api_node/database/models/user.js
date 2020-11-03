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
      User.hasMany(models.Unavailability, {
        foreignKey: 'userId',
        as: 'unavailabilities',
        onDelete: 'CASCADE',
      });
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
        onDelete: 'CASCADE',
      });
      User.belongsToMany(models.Team, {
        through: 'UserTeam',
        as: 'teams',
        foreignKey: 'userId',
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
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
