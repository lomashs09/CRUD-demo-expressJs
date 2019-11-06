
const jwt = require("jsonwebtoken");
// Verifying Token
function checkToken(req, res, next) {
  // Allowing Get request and form Submit
  if (req.path=="/submit" || req.path =='/' || req.path =='/login' ) {
    next();
  }else{
  // GET Auth Value
  requestHeader = req.headers["authorization"];

  // If token is in cookies not in headers
  if(typeof requestHeader == "undefined"){
    requestHeader = Object.values(req.cookies)[0].token
  }
  // Check if not Undefined
  if (typeof requestHeader !== "undefined") {
    // split at space
    const tokenArray = requestHeader.split(" ");
    //Get TOKEN from array
    let UserToken;
    // In cookies token is at 0th Position
    if(tokenArray[1]== undefined){
      UserToken = tokenArray[0];
    }else{
    UserToken = tokenArray[1];
    }
    // Set Token
    req.token = UserToken;
    // Next Middleware
    next();
  } else {
    //Forbidden
    res.sendStatus(403);
  }
}
}

function authenticateUser(req, res, next) {
  //Allowing GET request and Form Submit
  if (req.path=="/submit" || req.path == "/" || req.path =='/login') {
    next();
  } else {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        next();
      }
    });
  }
}


module.exports.checkToken = checkToken;
module.exports.authenticateUser = authenticateUser;
