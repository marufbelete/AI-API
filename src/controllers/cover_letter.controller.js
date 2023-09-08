const { createCompletion } = require("../chatGPT/createCompletion");
const { coverLetterSchema } = require("../validation/cover_letter.validation");
const { handleError } = require("../helper/handleError");

exports.generateCoverLetter = async (req, res, next) => {
  try {
    const {job_title,company_name,skill_highlight}=req.body
    const {error}=coverLetterSchema.validate({job_title,company_name,skill_highlight})
    if(error){
      handleError(error.message,403)
    }
    // const prompt=`Compose a compelling cover letter with good grammer for the position of ${job_title} at ${company_name}. Highlight the following skills and experiences:

    // ${skill_highlight}` 
    const prompt= `Craft a professional cover letter with impeccable grammar for the role of ${job_title} at ${company_name}. Elevate the following skills and experiences:
    ${skill_highlight}` 

    const cover_letter= await createCompletion(prompt)
    // console.log(cover_letter)
  //  await new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve('Promise resolved after 2 seconds');
  //     }, 2000);
  //   });
    return res.json(cover_letter)
    // return res.json(cover_letter)
  }
  catch (err) {
    next(err);
  }
};












