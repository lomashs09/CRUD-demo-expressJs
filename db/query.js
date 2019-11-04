const { Client } = require('pg');
// database
const client = new Client({
  user:"lomash",
  password:"test123",
  host:"localhost",
  database:"insta"
})
client.connect()
.then(()=>console.log('connected successfully'))
.catch(err=>console.log(err))

function addUser(name,phone,email,password){
  const text = 'INSERT INTO usertable(name, email, password) VALUES($1, $2, $3) RETURNING *'
  const values = [name,email,password]
  return client.query(text, values)
}

module.exports = addUser;