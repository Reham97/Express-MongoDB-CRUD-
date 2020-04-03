//npm start
require('./models/connection');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
// const errorhandler = require('errorhandler')
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');

const app = express();

app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

// middleware to print information
app.use(function (req, res, next) {
  console.log("request method: " + req.method);
  console.log("request url: " + req.originalUrl);
  console.log("request date: " + new Date());
  next();
});

//Middleware l users
// app.use('/users', () => console.log("be careful")
// );

//error middleware
app.use(function(error, req, res, next) {
  
  res.json({ message: error.message });
});



//test error middleware
//teset error 
//http://localhost:5000/
app.get('/', (req, res, next) => {
   res.send('uncomment line 47 in index.js to test error handler');
  //throw new Error('this is erorr woops')
});


// app.get('/users', (req, res) =>
//   res.send('users')
// );

//app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use('/post', postController);
app.use('/user', userController)



















