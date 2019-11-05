const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

//database
const client = new Client({
  user:process.env.user,
  password:process.env.password,
  host:process.env.host,
  database:process.env.database
})

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected to db')
  }
})
module.exports= client;
