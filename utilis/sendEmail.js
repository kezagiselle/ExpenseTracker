import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';


const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'kezagiselle776@gmail.com',
          pass: 'mvhf ifkq mgih cwak'
        },
      });
      

    const mailOptions = {
        from: 'kezagiselle776@gmail.com',
        to,
        subject,
        text
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;
