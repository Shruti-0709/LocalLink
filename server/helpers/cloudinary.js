const cloudinary=require("cloudinary").v2;
const multer=require("multer");

cloudinary.config({
 cloud_name:'djvjh8khu',
 api_key:"329695298565311",
 api_secret:"SaB60eOwxjWoMziQbwue9Idvk8c"
});

const storage = new multer.memoryStorage();

// async function imageUploadUtil(fileBuffer) {
//     const result = await cloudinary.uploader.upload({ resource_type: 'auto' }, (error, result) => {
//       if (error) throw error;
//       return result;
//     }).end(fileBuffer); // Use the file buffer
  
//     return result;
//   }

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}


const upload=multer({storage});

module.exports = {upload,imageUploadUtil}