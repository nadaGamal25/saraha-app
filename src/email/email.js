import nodemailer from 'nodemailer'

export const sendEmail=(email,otpCode)=>{
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:'gnada1221@gmail.com',
            pass:'adznraiylhtylrwq'
        },
    })

    const mailOptions = {
        from: '"App" <gnada1221@gmail.com>',
        to: email,
        subject: 'verification Code',
        text: `Your OTP code is: ${otpCode}. It will expire in 10 minutes.`
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Email sent: ' + info.response);
      });
}