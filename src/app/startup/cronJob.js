const cron = require("node-cron");
const fs = require("fs").promises;
const s3Client = require("../config/s3");
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);


async function uploadFile(params) {
  return s3Client.upload(params).promise();
}
/**
 * @desc     Make backup in aws bucket from database every night at 23:59 PM   (USA TIME)
 */

module.exports = async () => {

    //  pg_dump -U postgres -f codetogeeks_db_backup.dump codetogeeks

  await cron.schedule("0 */24 * * *", async () => {

    console.log("cron job start");

    const createBackup = await exec('pg_dump -U postgres -f codetogeeks_db_backup.dump codetogeeks');
    const compressZipBackup = await exec('zip -r db.zip codetogeeks_db_backup.dump');
   
  const fullPath ='/opt/codetogeeks/code-to-geeks-api/db.zip'
  const data = await fs.readFile(fullPath);

    //  upload file to aws S3
    const uploadParams = {
      Bucket: process.env.BUCKET,
      Key: "backup/db.zip",
      Body: data,
    };

    await uploadFile(uploadParams);
   
    console.log("cron job end");

  });
};