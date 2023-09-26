const { createCompletion } = require("../chatGPT/createCompletion");
const { coverLetterSchema } = require("../validation/cover_letter.validation");
const { handleError } = require("../helpers/handleError");

exports.generateCoverLetter = async (req, res, next) => {
  try {
    const {job_title,company_name,resume,job_description}=req.body
    const {error}=coverLetterSchema.validate({job_title,company_name,resume,job_description})
    if(error){
      handleError(error.message,403)
    }
    let prompt = `Craft a compelling cover letter for the position of ${job_title} at ${company_name}. Here is my resume: ${resume} and job description: ${job_description}. 
    The cover letter must consist of three or more well-structured paragraphs.`;
    let cover_letter= await createCompletion(prompt)
    return res.json(cover_letter)
  }
  catch (err) {
    next(err);
  }
};












