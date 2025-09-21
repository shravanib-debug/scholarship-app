const sgMail = require('@sendgrid/mail');

// Replace with your real API key for testing
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail() {
  const msg = {
    to: "receiver@example.com",   
    from: "your_verified_sender@gmail.com", // must be verified sender
    subject: "Hackathon Test Email 🚀",
    text: "This is a test email sent from SendGrid + Node.js",
  };

  try {
    await sgMail.send(msg);
    console.log("✅ Email sent successfully!");
  } catch (error) {
    console.error("❌ Full Error:", error.response?.body || error.message);
  }
}

sendEmail();
