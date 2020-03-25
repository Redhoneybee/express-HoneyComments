
module.exports = (sequelize, DataTypes) =>(
  sequelize.define('comments',{
    contents : {
      type : DataTypes.STRING(20),
      allowNull : false,
    }
  }, {
    timestamps : true,
    paranoid : true
  })
);
