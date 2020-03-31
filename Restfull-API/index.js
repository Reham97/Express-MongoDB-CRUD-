//npm start
require('./models/connection');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const userController = require('./controllers/userController');
const app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');



//Middleware l users
// app.use('/users', () => console.log("be careful")
// );

app.get('/', (req, res) =>
  res.send('hi')
);

// app.get('/users', (req, res) =>
//   res.send('users')
// );

//app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use('/user', userController);
