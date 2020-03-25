
module.exports = (sequelize, DataTypes) => (
  sequelize.define('domains', {
    host : {
      type : DataTypes.STRING(80),
      allowNull : false
    },
    type : {
      type : DataTypes.STRING(20),
      allowNull : false
    },
    clientSecret : {
      type : DataTypes.STRING(100),
      allowNull: false
    }
  },{
    validate : {
      unknownType(){
        if(this.type !== 'free' && this.type !== 'premium'){
          throw new Error('free type and premium type select');
        }
      }
    },
    timestamps : true,
    paranoid : true
  })
);
