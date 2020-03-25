const express = require('express')
      ,path = require('path')
      ,bodyParser = require('body-parser')
      ,cookieParser = require('cookie-parser')
      ,expressSession = require('express-session');

const indexPage = require('./routes');
const authPage = require('./routes/auth');
const postPage = require('./routes/post');
const apiPage = require('./routes/api')

const  {sequelize} = require('./models');

// logger
const morgan = require('morgan');

// passport
const passport = require('passport');
const passportConfig = require('./passport')(passport);

require('dotenv').config();


const app = express();
sequelize.sync();
// app - set
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// app -use
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extneded : false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.SECRET));
app.use(expressSession({
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : false,
    cookie : {
      httpOnly : true,
      secure : false
    }
}));

const flash = require('connect-flash');
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexPage);
app.use('/auth', authPage);
app.use('/post', postPage);
app.use('/api', apiPage);
// error
app.use('/', (req, res, next) =>{
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use('/', (err, req, res, next) =>{
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () =>{
  console.log(`Started to honey api service / ${app.get('port')}`);
});
