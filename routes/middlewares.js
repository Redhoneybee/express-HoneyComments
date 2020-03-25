
exports.isLogin = (req, res, next) =>{
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/');
  }
};

exports.isNotLogin = (req, res, next) =>{
  if(!req.isAuthenticated()){
    next();
  }else{
    res.redirect('/');
  }
};
