

// default route
const express = require('express');
const { isLogin, isNotLogin } = require('./middlewares');
const axios = require('axios');
const router = express.Router();

router.get('/', (req, res) =>{
  console.dir(req.user);
  res.render('index', {user : req.user});
});
router.get('/join', isNotLogin, (req, res) =>{
  res.render('join');
});

router.get('/comment', isLogin, (req, res) =>{
  res.render('comment', {user : req.user});
});
router.get('/login', isNotLogin, (req, res) =>{
  res.render('login')
});

router.get('/apiService', isLogin, (req, res) =>{
  res.render('apiService');
});

module.exports = router;
