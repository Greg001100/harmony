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
      const serverColumnMap = {
        through: 'Server_User',
        otherKey: 'userId',
        foreignKey: 'serverId'
      }
      this.myAssociation = this.belongsToMany(models.User, serverColumnMap);
      this.myAssociation = this.belongsTo(models.User, {foreignKey: 'ownerId'});

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
// module.exports = (sequelize, DataTypes) => {
//   const Server = sequelize.define('Server', {
//     name: DataTypes.STRING,
//     ownerId: DataTypes.INTEGER,
//     public: DataTypes.BOOLEAN,
//     picUrl: DataTypes.STRING
//   }, {});

//   Server.associate = function (models) {
//     Server.hasMany(models.Channel, {foreignKey: 'serverId'});
//     Server.belongsTo(models.User, {foreignKey: 'ownerId'});
//     const serverColumnMap = {
//       through: 'Server_User',
//       otherKey: 'userId',
//       foreignKey: 'serverId'
//     }
//     Server.belongsToMany(models.User, serverColumnMap);

//   };
//   return Server;
// };
