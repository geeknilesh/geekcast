const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

// const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };

const sasAccountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;

const sharedKeyCredential = new StorageSharedKeyCredential(
  process.env.AZURE_STORAGE_ACCOUNT_NAME,
  process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY
);

//create a blob service client
const blobServiceClient = new BlobServiceClient(
  `https://${sasAccountName}.blob.core.windows.net`,
  sharedKeyCredential
);

//get container from blob service client
const containerClient = blobServiceClient.getContainerClient("images");

async function uploadToAzureStorage(containerClient, fileName) {
  await containerClient.createIfNotExists({
    access: "container",
  });

  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  try {
    const uploadBlobResponse = await blockBlobClient.uploadFile(
      path.join(__dirname, "..", "uploads", fileName)
    );
    console.log(`Uploaded file successfully: `, uploadBlobResponse.requestId);
    return { status: true, response: uploadBlobResponse };
  } catch (err) {
    console.log("error uploading to azure storage: " + err.message);
    return { status: false, response: err };
  }
}

const uploadImage = async (file) => {
  fs.access("./uploads", (err) => {
    if (err) fs.mkdirSync("./uploads");
  });

  //   console.log(req.body);

  const { buffer } = file;
  const timestamp = new Date().toISOString();
  //   const imageName = originalname.split(".");
  const ext = "webp"; //imageName[imageName.length - 1];
  const imageRef = `${timestamp}.${ext}`;

  const refUrl = path.join(__dirname, "..", "uploads", imageRef); // __dirname + imageRef;
  console.log(refUrl);
  await sharp(buffer).webp({ quality: 20 }).toFile(refUrl);
  console.log("Image saved locally!");

  //upload to azure storage
  const azureUploadStatus = await uploadToAzureStorage(
    containerClient,
    imageRef
  );

  if (azureUploadStatus.status === true) {
    return { status: true, url: process.env.BLOB_PRE_URL + imageRef };
  } else {
    return {
      status: false,
      error: azureUploadStatus.response,
    };
  }
};

module.exports = {
  uploadImage,
};
