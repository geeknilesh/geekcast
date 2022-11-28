const express = require("express");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

require("dotenv").config();

const sasAccountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const azureAccKey = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;

const sharedKeyCredentials = new StorageSharedKeyCredential(
  sasAccountName,
  azureAccKey
);

const blobServiceClient = new BlobServiceClient(
  `https://${sasAccountName}.blob.core.windows.net`,
  sharedKeyCredentials
);

async function main() {
  //   List all the containers
  //   let i = 1;
  //   let containers = blobServiceClient.listContainers();
  //   for await (const container of containers) {
  //     console.log(`${i++}: ${container.name}`);
  //   }
  //Upload blob
}

app.get("/", upload.single("img"), async (req, res) => {
  //   main();

  const file = req.file;
  const containerName = "images";
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const data = "this is a sample data file";
  const blobName = "random";

  const blockBlobClient = containerClient.getBlockBlobClient("nilesh.png");
  const uploadBlobResponse = await blockBlobClient.uploadFile(
    __dirname + "/uploads/nilesh.png"
  );
  console.log(`Upload block blob ${blobName}: `, uploadBlobResponse);

  res.send("All good");
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
