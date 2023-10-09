const User = require("../models/user.model");

const insertUser=async(param,transaction={})=>{
  const new_user = new User(param)
  const  result= await new_user.save({...transaction})
  return result;
}
const fetchUserById=async(userId,transaction={})=>{
  const  result= await User.findByPk(userId)
  return result;
}

const fetchUsers=async(transaction={})=>{
  const  result= await User.findAll()
  return result;
}


module.exports={
insertUser,
fetchUserById,
fetchUsers
}