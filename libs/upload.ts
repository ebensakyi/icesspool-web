import fs from "fs";
import { writeFile } from "fs/promises";
import AWS from "aws-sdk";

export const saveFileOnDisk = async (file: File) => {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    //let fileName = nanoid(10) + file.name;
    let fileName =  file.name;


    const path = `./public/temp/${fileName}`;

    let res = await writeFile(path, buffer);

    
    return fileName;
  } catch (error) {
    console.log(error);
    return "0"
  }
};

export const upload2S3 = async (fileName:any,bucketName:any) => {
    try {
        AWS.config.update({
          accessKeyId: process.env.MY_AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    
        var s3 = new AWS.S3();
    
        var filePath = `./public/temp/${fileName}`;
    
        var params = {
          Bucket: bucketName,
          Body: fs.createReadStream(filePath),
          // Key: prefix + "/" + fileName,
          Key: fileName,
        };
    
        let stored = await s3.upload(params).promise();
        console.log("STORE ", stored.Location);
    
        return stored.Location;
      } catch (error) {
        console.log("UploadFile Error ", error);
        return error;
      }

}

