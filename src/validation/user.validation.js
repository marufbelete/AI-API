const Joi = require('joi');

 const signupUserSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    avatar: Joi.string(),
    password: Joi.string().min(8).required(),
});

 const loginUserSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.required()

});


module.exports={
    signupUserSchema,
    loginUserSchema
}