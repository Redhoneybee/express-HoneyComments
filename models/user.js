
module.exports = (sequelize, DataTypes) =>(
  sequelize.define('users', {
    user_id : {
      type : DataTypes.STRING(15),
      allowNull : false,
      unique : true
    },
    user_password : {
      type : DataTypes.STRING(100),
      allowNull : false
    },
    user_email : {
      type : DataTypes.STRING(40),
      allowNull : false,
      unique : true
    },
    user_name : {
      type : DataTypes.STRING(20),
      allowNull : false,
      unique : true
    }
  },{
    timestamps : true,
    paranoid : true
  })
);
