require("dotenv").config();
const {
  GetObjectCommand,
  S3Client,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});

async function getObjectUrl(key) {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  console.log(url);
}
getObjectUrl("uploads/15.jpeg"); // use this function to get presigned url of our bucket private object

async function putObjectUrl(filename, contentType) {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    ContentType: contentType,
    Key: "uploads/" + filename,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
  console.log(url);
}
// putObjectUrl(`${new Date().getDate()}.jpeg`, "image/jpeg"); // use this function to store the image into a private bucket
