const joi = require("@hapi/joi");

// Validate User Details
function validateNewUser(req){
  let newObj = {name:req.body.name, email:req.body.email, phone:req.body.phone,password:req.body.password}
  const schema = joi.object({
    name:joi.string().alphanum().min(2).max(30).required(),
    email:joi.string().trim().email().required(),
    password:joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
    phone:joi.number().integer().min(5).max(99999999999).required()
});
return schema.validate(newObj);
}
function validateLoginDetails(req){
  let newObj = {email:req.body.email,password:req.body.password}
  const schema = joi.object({
    email:joi.string().trim().email().required(),
    password:joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
});
return schema.validate(newObj);
}

module.exports.validateNewUser = validateNewUser;
module.exports.validateLoginDetails = validateLoginDetails;
