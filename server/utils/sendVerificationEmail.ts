import sendEmail from './sendEmail';
import verificationEmail from './verificationEmail';

const sendVerificationEmail = async ({
  user_id,
  user_name,
  user_email,
  verificationToken,
  origin,
}: {
  user_id: string;
  user_name: string;
  user_email: string;
  verificationToken: string;
  origin: string;
}) => {
  const url = `${origin}/auth/verify/${user_id}/${verificationToken}`;
  const message = verificationEmail({ user_name, url });
  console.log(url, message);
  return sendEmail({
    to: user_email,
    subject: 'Account Verification',
    html: `${message}`,
  });
};

export default sendVerificationEmail;
