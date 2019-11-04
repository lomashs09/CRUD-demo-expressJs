const { Client } = require('pg');
// temp database
const client = new Client({
  user:"postgres",
  password:"test123",
  host:"localhost",
  database:"insta"
})
client.connect()
.then(()=>console.log('connected successfully'))
.catch(err=>console.log(err))

module.export = client;
