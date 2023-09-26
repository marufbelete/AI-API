const { google } = require('googleapis');
const { Readable } = require('stream');
const xlsx = require('xlsx');
const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: 'https://www.googleapis.com/auth/drive.file',
  });
  
  async function uploadFile(bufferData,path) {
    const drive = google.drive({ version: 'v3', auth: auth });
      const file = await drive.files.create({
        media: {
          body: Readable.from(bufferData),
        },
        fields: 'id',
        requestBody: {
          name: path,
        },
      });
     return file
  }

async function readFile(fileId) {
  const drive = google.drive({ version: 'v3', auth });
  const response = await drive.files.get(
    {
      fileId: fileId,
      alt: 'media',
    },
    { responseType: 'arraybuffer' } // Use 'arraybuffer' as the responseType
  );

  const data = new Uint8Array(response.data); // Convert the response data to Uint8Array
  const workbook = xlsx.read(data, { type: 'array' }); // Parse the data using xlsx

  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);
  return jsonData;
}

async function deleteFile(fileId) {
  const drive = google.drive({ version: 'v3', auth });
  const response = await drive.files.delete({fileId});
  return response;
}

  module.exports={
    uploadFile,
    readFile,
    deleteFile
  }