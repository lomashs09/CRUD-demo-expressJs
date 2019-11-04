const express = require('express');
// const config = require('./db/config')
const app = express();
const port =4000;
const exphbs = require('express-handlebars');
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Registration Page for User
app.use('', require('./routes/registration'));  

app.listen(port, () => console.log(`app listening on port ${port}!`));