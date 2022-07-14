const cron = require("node-cron");
const fs = require("fs/promises");
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

  await cron.schedule("*/5 * * * *", async () => {

    console.log("cron job start");

    const createBackup = await exec('pg_dump -U postgres -f codetogeeks_db_backup.dump codetogeeks');
    const compressZipBackup = await exec('zip -r db.zip codetogeeks_db_backup.dump');
/*
    exec('pg_dump -U postgres -f codetogeeks_db_backup.dump codetogeeks', async(error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);



        //   zip -r db.zip codetogeeks_db_backup.dump
          return;
        }
      
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
      
        console.log(`stdout:\n${stdout}`);



      });
*/
/*    const data = await fs.readFile(fullPath);

    //  upload file to aws S3
    const uploadParams = {
      Bucket: process.env.BUCKET,
      Key: "backup/" + process.env.BACKUP_FILE_NAME,
      Body: data,
    };
    await uploadFile(uploadParams);*/
    console.log("cron job end");

  });
};