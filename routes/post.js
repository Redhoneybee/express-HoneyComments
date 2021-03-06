const express = require('express');
const { User, Comment, Domain } = require('../models');
const { isLogin } = require('./middlewares');

const router = express.Router();


router.get('/show/all', isLogin, (req, res, next) =>{
  Comment.findAll({})
    .then((users) => {
      const json = {
        len : users.length
      }
      res.json(json);
    })
    .catch((error) =>{
      console.error(error);
      next(error);
    });
});


router.get('/show/:page', isLogin, (req, res, next) =>{
  const pageNumber = req.params.page - 1;
  const showNumber = 5;
  Comment.findAll({
    include : {
      model : User,
      attributes : ['user_name']
    },
    offset : pageNumber * showNumber,
    limit : showNumber,
    order : [['createdAt', 'DESC']]
  })
  .then((users) =>{
    console.dir(users);
    res.json(users);
  })
  .catch((error) =>{
    console.error(error);
    next(error);
  });
});


router.post('/create', isLogin, async (req, res, next) =>{
  await Domain.findOne({where : { host : req.user.id }})
    .then((result) =>{
      if(result){
        // have a Keys
        // Don't have
        console.log(result.length, result);
        const { contents } = req.body;
        Comment.create({
          contents,
          writer : req.user.id
        })
        .then((result) =>{
          res.render('comment');
        })
        .catch((error) =>{
          console.error(error);
          next(error);
        });
      }else{
        // Don't have
        res.render('apiService')
      }
    })
    .catch((error) =>{
      console.error(error);
      next(error);
    });
});



module.exports = router;
