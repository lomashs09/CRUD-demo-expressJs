const { Client } = require('pg');
// database
const client = new Client({
  user:"postgres",
  password:"test123",
  host:"localhost",
  database:"insta"
})
client.connect()
.then(()=>console.log('connected successfully'))
.catch(err=>console.log(err))

function addUser(name,phone,email,password){
    return new Promise(()=>{
        client.query('SELECT * FROM user', (err, res) => {
            // console.log(err, res)
            client.end()
          })
    })
}

module.exports = addUser;