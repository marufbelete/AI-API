const { createCompletion } = require("../chatGPT/createCompletion");
const { coverLetterSchema } = require("../validation/cover_letter.validation");
const { handleError } = require("../helpers/handleError");

exports.generateCoverLetter = async (req, res, next) => {
  try {
    const {job_title,company_name,skill_highlight,full_name,resume,year_experince}=req.body
    console.log(req.body)
    const {error}=coverLetterSchema.validate({job_title,company_name,skill_highlight})
    if(error){
      handleError(error.message,403)
    }
    // const prompt=`Compose a compelling cover letter with good grammer for the position of ${job_title} at ${company_name}. Highlight the following skills and experiences:

    // ${skill_highlight}`
    let prompt = `Craft a compelling cover letter for the position of ${job_title} at ${company_name}. Highlight the following skills and experiences: ${skill_highlight}.
    
    The cover letter must consist of three or more well-structured paragraphs. Must have proper indentation and include <br> tags for line breaks.`;
    
    if (full_name) {
        prompt = `Craft a compelling cover letter for the position of ${job_title} at ${company_name}. Here is the detail of the person's full name: ${full_name}. Highlight the following skills and experiences: ${skill_highlight}.
        
    The cover letter must consist of three or more well-structured paragraphs. Must have proper indentation and include <br> tags for line breaks.`;
    }
    
    if (year_experince) {
        prompt = `Craft a compelling cover letter for the position of ${job_title} at ${company_name}. Here is the detail of the person's full name: ${full_name}, and working years of experience: ${year_experince}. Highlight the following skills and experiences: ${skill_highlight}.
        
    The cover letter must consist of three or more well-structured paragraphs. Must have proper indentation and include <br> tags for line breaks.`;
    }
    
    if (resume) {
        prompt = `Craft a compelling cover letter for the position of ${job_title} at ${company_name}. Here is the detail of the person's full name: ${full_name}, working years of experience: ${year_experience}, and resume: ${resume}. Highlight the following skills and experiences: ${skill_highlight}.
        
    The cover letter must consist of three or more well-structured paragraphs. Must have proper indentation and include <br> tags for line breaks.`;
    }
    
//new
    // let prompt= `Craft a professional cover letter with impeccable grammar for the role of ${job_title} for ${company_name}. Elevate the following skills and experiences:
    // ${skill_highlight} The cover letter must be three or more paragraph with proper indentation and space between each paragraph` 
    // if(full_name){
    // prompt= `Craft a professional cover letter with impeccable grammar for the role of ${job_title} for ${company_name}. Here is the detail person full name ${full_name}. Elevate the following skills and experiences:
    //   ${skill_highlight} The cover letter must be three or more paragraph with proper indentation and space between each paragraph`
    // }
    // if(year_experince){
    // prompt= `Craft a professional cover letter with impeccable grammar for the role of ${job_title} for ${company_name}. Here is the detail person full name ${full_name}, working year of experince ${year_experince}. Elevate the following skills and experiences:
    //   ${skill_highlight} The cover letter must be three or more paragraph with proper indentation and space between each paragraph`
    // }
    // if(resume){
    // prompt= `Craft a professional cover letter with impeccable grammar for the role of ${job_title} for ${company_name}. Here is the detail, person full name ${full_name}, working year of experince ${year_experince}, resume ${resume}. Elevate the following skills and experiences:
    //   ${skill_highlight}. The cover letter must be three or more paragraph with proper indentation and space between each paragraph`
    // }
    // prompt given
    // please write a personalized cover letter for this [job title ] at [company]. Here is the job description: [job description]. And here is my resumer: [resume]
    const cover_letter= await createCompletion(prompt)
    return res.json(cover_letter)
  //  await new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve('Promise resolved after 2 seconds');
  //     }, 2000);
  //   });
    // return res.json(cover_letter)
  }
  catch (err) {
    next(err);
  }
};












