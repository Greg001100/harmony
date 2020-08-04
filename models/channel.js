'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.myAssociation = this.belongsTo(models.Server, {foreignKey: 'serverId'});
      this.myAssociation = this.hasMany(models.Message, {foreignKey: 'channelId'});
    }
  };
  Channel.init({
    name: DataTypes.STRING,
    serverId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Channel',
  });
  return Channel;
};
