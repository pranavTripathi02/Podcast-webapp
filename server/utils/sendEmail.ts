import nodemailer from 'nodemailer';
const nodemailerConfig = require('./nodemailerTransportConfig');
// import { nodemailerConfig } from './nodemailerTransportConfig';

const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  // let testAccount = await nodemailer.createTestAccount();

  //console.log(nodemailerConfig);
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Podcast App" <noreply@equity-trading.com>',
    to,
    subject,
    html,
  });
};

export default sendEmail;
