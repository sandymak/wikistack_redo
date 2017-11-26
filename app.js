const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const PORT = 3000;


const app = express();


// Error logging and BodyParsing
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {
  noCache: true
});


// static file-serving middleware
// don't need to look inside 'public' due to inistial set up here. app.use(express.static) is already loking inside 'public' directory
//http://localhost:3000/stylesheets/style.css
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 (i.e., no route was hit) and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found!');
  err.status = 404;
  next(err);
});

// handle error
app.use((err, req, res, next) => {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.send('Uh-oh! Something went wrong:' + err.message);
});


app.listen(PORT, (req, res, next) => {
  console.log(path.join(__dirname, 'public'));
  console.log(`listening on ${PORT}`);
});
