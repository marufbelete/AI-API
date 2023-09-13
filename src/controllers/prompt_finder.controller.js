const { createCompletion } = require("../chatGPT/createCompletion");
const { handleError } = require("../helpers/handleError");
const { promptFinderSchema } = require("../validation/prompt_finder.validation");
const fs = require('fs');
const data = require('../doc/fieldInfo.json');
const getFilterdDataByFieldAndOportnity=(field,training)=>{
const filteredInfo = data.Infomation.find(info =>info.Department === field);
let opportunity_elgi=filteredInfo.OpportunityElgi.find(opportnunity=>opportnunity.Opportunity===training)
  let info={
    department:field,
    training:training,
    eligibility:opportunity_elgi.Eligibilitycriteria,
    notes:filteredInfo.Notes,
    trainjob:filteredInfo.TrainingJob,
    audience:filteredInfo.Audience,
    state:filteredInfo.CouncilStateFederal,
    link:filteredInfo.Links
  }
return info
}

exports.generateFieldInfo = async (req, res, next) => {
  try {
    const {field,training}=req.body
    const {error}=promptFinderSchema.validate({field,training})
    if(error){
      handleError(error.message,403)
    }
    let info=getFilterdDataByFieldAndOportnity(field,training)
    // const prompt=`Compose a compelling cover letter with good grammer for the position of ${job_title} at ${company_name}. Highlight the following skills and experiences:
    // console.log(info)
    // nman
    // ${skill_highlight}` 
    // const prompt= `prepare this information in the most meaningg full way for student based on the following information,
    // department:${info.department}, training criteria: ${info.eligibility},
    // Tarining/Job: ${info.trainjob}, audience: ${info.audience}, Council/State/Federal:${info.state},
    // notes: ${info.notes}, link: ${info.link}` 
    const prompt=`Prepare comprehensive information for students regarding the [Department Name] department's training and job opportunities. Ensure that the information is presented in a clear and meaningful way. Below are the details you need to include:
    - Department: ${info.department}
    - Field: ${info.training}
    - Training Criteria: ${info.eligibility}
    - Training/Job Opportunities: ${info.trainjob}
    - Target Audience: ${info.audience}
    - Council/State/Federal Involvement: ${info.state}
    - Notes: ${info.notes}
    - Link: ${info.link}
    Your task is to compile this information into a well-organized document or web page that will be informative and helpful for students looking to explore opportunities within this department. Pay attention to clarity, accuracy, and the overall presentation of the information.
    Please ensure that the final document provides a comprehensive overview of the department's offerings and is suitable for a student audience. Feel free to use appropriate formatting and structure to enhance readability.
    `

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


exports.getAllField=async(req,res,next)=>{
  try {
    const result=data.Infomation.map(e=>e.Department)
    return res.json(result) 
  } catch (error) {
    next(error)
  }

}

exports.getAllTrainingForField=async(req,res,next)=>{
  try {
    const field=req.query?.field
    if(!field){
      return res.json([])
    }
    const result=data.Infomation.find(e=>e.Department===field)
    const training=result?.OpportunityElgi?.map(e=>e?.Opportunity)
    return res.json(training) 
  } catch (error) {
    next(error)
  }

}











