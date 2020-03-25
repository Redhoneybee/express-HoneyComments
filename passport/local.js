

const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = (passport) =>{
  passport.use(new Strategy({
    usernameField : 'user_id',
    passwordField : 'user_password'
  }, async (user_id, user_password, done) =>{
    try{
      const searchUser = await User.findOne({where : { user_id }});
      if(searchUser){
        const result = await bcrypt.compare(user_password, searchUser.user_password);
        if(result){
          // successed to match
          done(null, searchUser);
        }else{
          // Failed to match
          done(null, false , {message : 'Failed to Login / password'});
        }
      }else{
        // not user
        done(null, false, {meesage : 'Failed to Login / user'});
      }
    }catch(err){
      console.error(err);
      done(err);
    }
  }
))
};
