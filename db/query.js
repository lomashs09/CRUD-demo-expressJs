const client = require('./config');

function addUser(name,phone,email,password){
  const text = 'INSERT INTO usertable(name, email, password) VALUES($1, $2, $3) RETURNING *'
  const values = [name,email,password]
  return client.query(text, values)
}

function verifyUser(email,password){
  const text = 'SELECT 1 FROM usertable WHERE email=$1;'
  const values = [email]
  return client.query(text,values)
}

function addPost(email,title,image_path){
  const text = 'INSERT INTO newposts(email,title,image_path) VALUES ($1, $2, $3) RETURNING *'
  const values = [email,title,image_path]
  return client.query(text,values)
}

function fetchPosts(){
  const text = 'SELECT * FROM newposts order by post_id DESC'
  return client.query(text)
}

function deletePost(postId){
  const text = 'DELETE FROM newposts WHERE post_id = $1'
  const values = [postId]
  return client.query(text,values)
}

module.exports.addUser = addUser;
module.exports.verifyUser= verifyUser;
module.exports.addPost = addPost;
module.exports.fetchPosts = fetchPosts;
module.exports.deletePost = deletePost;