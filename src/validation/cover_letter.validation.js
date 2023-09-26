const Joi = require('joi');

 const coverLetterSchema = Joi.object({
    job_title: Joi.string().required(),
    company_name: Joi.string().required(),
    // skill_highlight: Joi.string().required(),
    resume: Joi.string().required(),
    job_description: Joi.string()
});

module.exports={
    coverLetterSchema
}