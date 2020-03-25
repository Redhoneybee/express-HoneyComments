
const express = require('express');
const passport = require('passport');
const { isLogin , isNotLogin } = require('./middlewares');
const { User } = require('../models');

const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/join', isNotLogin, async (req, res, next) =>{
  const { user_id, user_password, user_email, user_name } = req.body;
  try{
    const searchUser = await User.findOne({ where : { user_id } });

    if(searchUser){
      // user is
      req.flash('joinError', 'already to id');
      return res.redirect('/join');
    }
    // not user
    const hashPassword = await bcrypt.hash(user_password, 16);

    await User.create({
      user_id,
      user_password : hashPassword,
      user_email,
      user_name
    });
    return res.redirect('/');
  }catch(err){
    console.error(err);
    return next(err);
  }
});

router.post('/login', isNotLogin, (req, res, next) =>{
  passport.authenticate('local', (err, user, info) =>{
    // error
    if(err){
      console.error(err);
      return next(err);
    }

    // not user // failed to login
    if(!user){
      req.flash('loginError', info.message);
      return res.redirect('/login');
    }

    return req.login(user, (loginError) =>{
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', isLogin, (req, res, next) =>{
  req.logout();
  req.session.destroy();
  res.redirect('/');
});
module.exports = router;
