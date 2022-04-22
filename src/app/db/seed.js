
module.exports.seed = {

    defult_profile_image : `INSERT INTO file
    (file_link, s3_key, original_name, extention, created_at) 
    VALUES(
        'https://image.shutterstock.com/image-vector/check-back-soon-hand-lettering-600w-1379832464.jpg',
        'keys3985' ,'plapla', 'png' ,CURRENT_TIMESTAMP)`,
    defult_tag : `INSERT INTO tag(name, description, color, created_at) VALUES('other','unclassified post tag' ,'#ff6fff', CURRENT_TIMESTAMP)`,

}