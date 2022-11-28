const express = require("express");
const app = express();
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  newPipeline,
} = require("@azure/storage-blob");

require("dotenv").config();

// const { DefaultAzureCredential } = require("@azure/identity");
const sasAccountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const azureAccKey = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;
console.log(sasAccountName);
console.log(azureAccKey);

// const blobServiceClient = new BlobServiceClient(
//   `https://${sasAccountName}.blob.core.windows.net`
// );

const sharedKeyCredentials = new StorageSharedKeyCredential(
  sasAccountName,
  azureAccKey
);

const blobServiceClient = new BlobServiceClient(
  `https://${sasAccountName}.blob.core.windows.net`,
  sharedKeyCredentials
);

async function main() {
  const containerName = `hello`;
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const createContainerResponse = await containerClient.create();
  console.log(
    `Created container ${containerName} successully`,
    createContainerResponse.requestId
  );
}

app.get("/", (req, res) => {
  main();
  res.send("All good");
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
