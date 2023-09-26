const express=require('express')
const route=express.Router({ mergeParams: true })
const { generateFieldInfo,getAllField,getAllTrainingForField,
   uploadXlsFile, readXlsFile,deleteFile,readFileUpload,updateFile} = require('../controllers/prompt_finder.controller')
const { errorHandler } = require("../middleware/errohandling.middleware");
const multer = require("multer");
const { authenticateJWT } = require('../middleware/auth.middleware');
const fileStorage = multer.memoryStorage();
const filefilter = (req, file, cb) => {
    if (file.mimetype === "application/vnd.ms-excel" ||
        file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      cb(null, true);
    } else {
      const type = file.mimetype.split("/")[1];
      req.mimetypeError = `${type} file is not allowed please attach only Excel file`;
      cb(
        null,
        false,
        new Error(`${type} file is not allowed please attach only Excel file`)
      );
    }
  };
const upload = multer({ storage: fileStorage, fileFilter: filefilter });

route.post('/uploadxlsx',authenticateJWT,upload.single('xlsfile'),uploadXlsFile,errorHandler)
// route.get('/readxlsx',readXlsFile,errorHandler)
route.post('/fieldinfo',authenticateJWT,generateFieldInfo,errorHandler)
route.get('/fields',authenticateJWT,getAllField,errorHandler)
route.get('/trainings',authenticateJWT,getAllTrainingForField,errorHandler)

route.put('/file',authenticateJWT,upload.single('xlsfile'),updateFile,errorHandler)
route.delete('/file/:id',authenticateJWT,deleteFile,errorHandler)
route.get('/file',authenticateJWT,readFileUpload,errorHandler)


module.exports=route