

const local = require('./local');
const { User } = require('../models');

module.exports = (passport) =>{
  passport.serializeUser((user, done) =>{
    done(null, user.user_id);
  });
  passport.deserializeUser((user_id, done) =>{
    User.findOne({where : { user_id }})
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local(passport);

};
