module.exports = (code) => {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div align="center" style="display:flex;border-bottom:1px solid #eee;">
      <a href="" style="padding:18px 10px 0px 0px; font-size:1.4em;display:flex; ;color: #CC0113;text-decoration:none;font-weight:600">ONEDICE</a>
      <img src="https://hawzen.s3.me-south-1.amazonaws.com/ONEDICECROP.png"
      style="width:100px;"
      alt="ONEDICE" >
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing ONEDICE. Use the following code to complete resting password procedures. OTP is valid for 10 minutes</p>
    <div style="display:flex; align-items:center; align-self:center;justify-content:center;">
    <div style="font-size: 26px; background:#ffffff;margin: 0 auto; display: inline-block;padding:4px 16px; width:60px; height:30px;color: #000000;  ">${code}</div>
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

// ${process.env.urlBase}+
