import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const ses = new AWS.SES();

export const sendVerificationEmail = async (email, token) => {
  const verifyLink = `http://your-ec2-public-ip:5000/api/auth/verify?token=${token}`;
  const params = {
    Source: process.env.SES_EMAIL,
    Destination: { ToAddresses: [email] },
    Message: {
      Subject: { Data: "Verify Your Email - Twin Travellers" },
      Body: {
        Html: {
          Data: `
            <h2>Welcome to Twin Travellers!</h2>
            <p>Click below to verify your email:</p>
            <a href="${verifyLink}">Verify Email</a>
          `
        }
      }
    }
  };

  return ses.sendEmail(params).promise();
};
