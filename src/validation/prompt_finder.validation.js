const Joi = require('joi');

 const promptFinderSchema= Joi.object({
    field: Joi.string().required(),
    training: Joi.string().required(),
});

module.exports={
    promptFinderSchema
}