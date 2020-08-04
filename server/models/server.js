'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Server extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.myAssociation = this.hasMany(models.Channel, {foreignKey: 'serverId'});
      this.myAssociation = this.belongsTo(models.User, {foreignKey: 'ownerId'});
      const serverColumnMap = {
        through: 'Server_User',
        otherKey: 'userId',
        foreignKey: 'serverId'
      }
      this.myAssociation = this.belongsToMany(models.User, serverColumnMap);

    }
  };
  Server.init({
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    public: DataTypes.BOOLEAN,
    picUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Server',
  });
  return Server;
};
