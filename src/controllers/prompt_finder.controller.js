const { createCompletion } = require("../chatGPT/createCompletion");
const { handleError } = require("../helpers/handleError");
const { promptFinderSchema } = require("../validation/prompt_finder.validation");
const { uploadFile, readFile, deleteFile } = require("../service/prompt_finder");
const fileUpload = require("../models/fileUpload.model");
const { removeDuplicatesByPropertyName } = require("../helpers/user");
// const path=require('path')

exports.generateFieldInfo = async (req, res, next) => {
  try {
    const {field,training}=req.body
    const {error}=promptFinderSchema.validate({field,training})
    if(error){
      handleError(error.message,403)
    }
    const keys=await fileUpload.findAll({where:{
      type:"field"
    }})
    let data=[]
    for (let key of keys){
      const file=await readFile(key.key)
      data.push(...file)
    }
    const info= data.find(e=>e.Department===field&&e.Opportunity===training)
    const prompt=`Prepare comprehensive information for students regarding the [Department Name] department's training and job opportunities. Ensure that the information is presented in a clear and meaningful way. Below are the details you need to include:
    - Department: ${info.Department}
    - Field: ${info.Opportunity}
    - Training Criteria: ${info.Eligibilitycriteria}
    - Training/Job Opportunities: ${info.TrainingJob}
    - Target Audience: ${info.Audience}
    - Council/State/Federal Involvement: ${info.CouncilStateFederal}
    - Notes: ${info.Notes}
    - Link: ${info.Links}
    Your task is to compile this information into a well-organized document or web page that will be informative and helpful for students looking to explore opportunities within this department. Pay attention to clarity, accuracy, and the overall presentation of the information.
    Please ensure that the final document provides a comprehensive overview of the department's offerings and is suitable for a student audience. Feel free to use appropriate formatting and structure to enhance readability.
    `
    const prompt_find= await createCompletion(prompt)
    return res.json(prompt_find)
  }
  catch (err) {
    next(err);
  }
};


exports.getAllField=async(req,res,next)=>{
  try {
    // const result=data.Infomation.map(e=>e.Department)
    const keys=await fileUpload.findAll({where:{
      type:"field"
    }})
    let data=[]
    for (let key of keys){
      const file=await readFile(key.key)
      data.push(...file)
    }
    const unique_arr=removeDuplicatesByPropertyName(data,"Department")
    const field=unique_arr.map(e=>e.Department)
    return res.json(field) 
  } catch (error) {
    next(error)
  }

}

exports.getAllTrainingForField=async(req,res,next)=>{
  try {
    const field=req.query.field
    const keys=await fileUpload.findAll({where:{
      type:"field"
    }})
    let data=[]
    for (let key of keys){
      const file=await readFile(key.key)
      data.push(...file)
    }
    const filter_data= data.filter(e=>e.Department===field)
    const training=filter_data.map(e=>e.Opportunity)
    return res.json(training) 
  } catch (error) {
    next(error)
  }

}

exports.uploadXlsFile=async(req,res,next)=>{
  try {
    if(req.user.role!=='admin'){
      handleError("privilage error",403)
    }
    const bufferData=req.file.buffer
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const path = req.file.originalname;
    const fullpath = uniquePrefix + "-" + path;
    const info= await uploadFile(bufferData,fullpath)
    await fileUpload.create({
    key:info.data.id,
    type:"field",
    name:path
    })
    return res.json({message:"file uploaded"})
  } catch (error) {
    next(error)
  }

}

exports.readXlsFile=async(req,res,next)=>{
  try {
    const id= req.file.id
    const info= await readFile(id)
    return res.json({message:"file read",info})
  } catch (error) {
    next(error)
  }
}

exports.updateFile=async(req,res,next)=>{
  try {
    if(req.user.role!=='admin'){
      handleError("privilage error",403)
    }
    console.log(req.body)
    const bufferData=req.file.buffer
    const fileId=req.body.id
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const path = req.file.originalname;
    const fullpath = uniquePrefix + "-" + path;
    const fileDb=await fileUpload.findOne({where:{id:fileId}})
    await fileUpload.destroy({where:{id:fileId}})
    await deleteFile(fileDb.key)
    const info= await uploadFile(bufferData,fullpath)
    await fileUpload.create({
    key:info.data.id,
    type:"field",
    name:path
    })
    return res.json({message:"file read",info})
  } catch (error) {
    next(error)
  }
}

exports.readFileUpload=async(req,res,next)=>{
  try {
    const info= await fileUpload.findAll()
    console.log(info)
    return res.json(info)
  } catch (error) {
    next(error)
  }
}
exports.deleteFile=async(req,res,next)=>{
  try {
    const fileId=req.params.id
    const fileDb=await fileUpload.findOne({where:{id:fileId}})
    await fileUpload.destroy({where:{id:fileId}})
    await deleteFile(fileDb.key)
    return res.json({message:"deleted"})
  } catch (error) {
    next(error)
  }
}














