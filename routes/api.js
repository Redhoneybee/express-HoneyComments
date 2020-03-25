
const express = require('express');
const uuidv4 = require('uuid/v4');
const { isLogin } = require('./middlewares');
const { Domain } = require('../models');
const router = express.Router();

router.get('/provide/:type', isLogin, (req, res, next) =>{
  const type = req.params.type;
  console.log(type);
  console.log(req.user._id);
  Domain.create({
    host : req.user.id,
    type,
    clientSecret : uuidv4(),
    userid : req.user.id
  })
  .then((response) =>{
    const json = {
      result : 'ok'
    }
    res.json(json);
  })
  .catch((error) =>{
    console.error(error);
    next(error);
  });
});

module.exports = router;
