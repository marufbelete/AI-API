const Joi = require('joi');

 const coverLetterSchema = Joi.object({
    job_title: Joi.string().required(),
    company_name: Joi.string().required(),
    skill_highlight: Joi.string().required(),
    resume: Joi.string(),
    year_experince: Joi.string()
});

module.exports={
    coverLetterSchema
}