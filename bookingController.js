// controllers/bookingController.js
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

// Configure AWS SES using same credentials from .env
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

export const createBooking = async (req, res) => {
  try {
    const { name, email, travelDate, destination, packageName, notes } = req.body;

    if (!name || !email || !travelDate || !destination || !packageName) {
      return res.status(400).json({ message: "Missing required booking fields." });
    }

    const emailBody = `
      <h2>New Travel Booking Received</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Travel Date:</b> ${travelDate}</p>
      <p><b>Destination:</b> ${destination}</p>
      <p><b>Package:</b> ${packageName}</p>
      <p><b>Special Requirements:</b> ${notes || "— none —"}</p>
      <hr/>
      <p>Sent automatically from Twin Travellers.</p>
    `;

    const params = {
      Source: process.env.SES_EMAIL,
      Destination: { ToAddresses: ["winmani9232@gmail.com"] },
      Message: {
        Subject: { Data: `New Booking: ${name} — ${packageName}` },
        Body: { Html: { Data: emailBody } },
      },
    };

    await ses.sendEmail(params).promise();

    return res.status(200).json({ message: "Booking email sent successfully." });
  } catch (err) {
    console.error("Booking error:", err);
    return res.status(500).json({ message: "Failed to send booking email." });
  }
};
