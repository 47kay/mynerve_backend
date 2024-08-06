import nodemailer, { SendMailOptions } from "nodemailer";
import environmentVariables from "./environments";

const { AUTH_EMAIL: user, AUTH_PASS: pass } = environmentVariables;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user, pass },
});

transporter.verify((error) => {
  if (error) {
    console.log(error, "Mailer error");
  } else {
    console.log("Ready for mailing");
  }
});

const sendMail = async (mailOptions) => {
  try {
    const emailsent = await transporter.sendMail(mailOptions);
    return emailsent;
  } catch (err) {
    throw err;
  }
};

export default sendMail;
