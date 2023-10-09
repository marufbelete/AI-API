const { signupUserSchema,
  loginUserSchema} = require("../validation/user.validation");
const { handleError } = require("../helpers/handleError");
const { issueToken, isEmailExist,
hashPassword, isPasswordCorrect} = require("../helpers/user");
const config = require("../config/config");
const {insertUser, fetchUserById, fetchUsers} = require("../service/user");
const sequelize = require('../util/database');


exports.registerUser = async (req, res, next) => {
  try {
    return await sequelize.transaction(async (t) => {
      const { first_name, last_name, email, password,createdAt } = req.body;
      const { error } = signupUserSchema.validate({
        first_name, last_name, email, password,createdAt
      })
      if (error) {
        handleError(error.message, 403)
      }
      
      if (await isEmailExist(email)) {
          handleError("User already exists with this email", 400);
        }
      const hashedPassword = await hashPassword(password);
       await insertUser({
        first_name, last_name,createdAt,
        email,password: hashedPassword,
      }, { transaction: t });
      return res.status(201).json({ success: true});
    });
  }
  catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const param = req.body
    const { error } = loginUserSchema.validate(param)
    if (error) {
      handleError(error.message, 403)
    }
    const { email, password } = req.body;
    const user = await isEmailExist(email);
    if (user) {
      if (await isPasswordCorrect(password, user.password)) {
        const access_token = await issueToken(
            { sub: user?.id, email: user.email ,role:user.role},
            config.ACCESS_TOKEN_SECRET,
            { expiresIn: config.ACCESS_TOKEN_EXPIRES })
        delete user.password
        return res.status(200).cookie("access_token", access_token, {
          sameSite: 'none',
          path: '/',
          secure: true,
          httpOnly: true
        }).json({ success: true, auth: true, user })
      }
      handleError("Incorrect username or password ", 400);
    }
    handleError("Incorrect username or password ", 400);
  }
  catch (err) {
    next(err);
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    return res.status(200).clearCookie('access_token',{
      sameSite: 'none',
      path: '/',
      secure: true,
      httpOnly: true
    }).json({
      success: true
    })
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users=await fetchUsers()
    return res.json(users)
  } catch (err) {
    next(err);
  }
};

exports.checkAuth = async (req, res, next) => {
  try {
    const sub = req.user.sub;
    const user= await fetchUserById(sub)
    delete user.password
    return res.status(200).json({
      success: true,user
    })
  } catch (err) {
    next(err);
  }
};
