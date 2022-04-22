module.exports = (link) => {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div align="center" style="display:flex;border-bottom:1px solid #eee;">
        <a href="" style="padding:18px 10px 0px 0px; font-size:1.4em;display:flex; ;color: #CC0113;text-decoration:none;font-weight:600">ONEDICE</a>
        <img src="https://hawzen.s3.me-south-1.amazonaws.com/ONEDICECROP.png"
        style="width:100px;"
        alt="ONEDICE" >
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing ONEDICE. Verify your email to finish signing up procedures. Email is valid for 10 minutes. </p>
      <p>Please confirm that, clicking on the button below </p>
      <div style="display:flex; align-items:center; align-self:center;justify-content:center;">                                         
      <a href=${link} target="_blank"  style=" padding:4px 3px;  border: 1px solid #CC0113; border-radius: 4px; margin: 0 auto; display: inline-block; font-size: 20px;    color:#000000;  text-decoration: none;">Verify
      my email</a>         
                                              
                                                                                                   
                                                                                                    
      
      </div>
      <p style="font-size:0.9em;">Regards,<br />ONEDICE</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>ONEDICE</p>
        <p>Saudi Arabia - Jeddah</p>
      </div>
    </div>
  </div>`;
};
