const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
const checkToken = require("./middleware/verifyToken").checkToken;
const authenticateUser = require('./middleware/verifyToken').authenticateUser;
const dotenv = require('dotenv');
dotenv.config();
// get port from env variable
const port =process.env.PORT || 4000;

const exphbs = require('express-handlebars');
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');
app.use(cookieParser());
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// First Get the Token Send in Header
app.use(checkToken); 
// Using the Token Authenticate the User
app.use(authenticateUser);

// Registration Page for User
app.use('', require('./routes/registration'));  
// Login Page 
app.use('',require('./routes/login'));
// CRUD operations for new post
app.use('',require('./routes/newPost'));
// home page
app.use('',require('./routes/home'));
app.listen(port, () => console.log(`app listening on port ${port}!`));