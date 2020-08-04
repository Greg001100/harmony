'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    hashedPassword: DataTypes.STRING.BINARY,
    picUrl: DataTypes.STRING

  }, {});
  User.associate = function (models) {
    User.hasMany(models.Server, { foreignKey: 'ownerId' });
    User.hasMany(models.Message, { foreignKey: 'userId' });
    const serverColumnMap = {
      through: 'Server_User',
      otherKey: 'serverId',
      foreignKey: 'userId'
    }
    User.belongsToMany(models.Server, serverColumnMap);
    const friendColumnMap = {
      through: models.Friendship,
      as: 'user_first_id',
      foreignKey: 'user_second_id'
    }
    User.belongsToMany(models.User, friendColumnMap);
  };
  return User;
};
