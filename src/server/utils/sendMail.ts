import nodemailer from 'nodemailer'

export const sendEmail = async (to : string, subject : string, text : string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.MY_EMAIL,
    to,
    subject,
    text,
  });
};