import HospitalFacility from "../domains/hospital_facility/model";
import comparedHashedData from "../utils/compareHashedData";
import { hashData } from "../utils/hashData";
import jwt from "jsonwebtoken";
import { createToken } from "./token.controller";
import sendMail from "../utils/sendMail";
import { findInitialChatForHealthcare } from "./chat.controller";

// create // register hospital facility on nerve
const createHospitalFacility = async (data) => {
  try {
    const { name, email, phoneNumber, contactPerson, password } = data;

    // Checking if user already exists
    const existingUser = await HospitalFacility.findOne({ email });
    if (existingUser) {
      throw Error("HospitalFacility with the provided email already exists");
    } else {
      // hash password
      const hashedPassword = await hashData(password);
      // Try to create new user
      const hospital = new HospitalFacility({
        name,
        email,
        phoneNumber,
        contactPerson,
        password: hashedPassword,
      });
      // save user
      const createdHospital = await hospital.save();
      return createdHospital;
    }
  } catch (err) {
    throw err;
  }
};

const loginUser = async ({ email, password }, res) => {
  try {
    if (!email || !password) {
      throw Error("Empty fields not allowed");
    }
    const user = await HospitalFacility.findOne({ email }).select("+password");
    if (!user) {
      throw Error("Hospital facility does not exist!");
    }
    // remote: 6657c85c7922deca00ff3c89, local:6657705c566f3e94538a21e1
    const chat = await findInitialChatForHealthcare(
      user._id,
      "6657c85c7922deca00ff3c89"
    );
    const comparedHashedPass = await comparedHashedData(
      password,
      user.password
    );
    if (comparedHashedPass === true) {
      const userRes = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerify: user.isVerify,
        isSuspended: user.isSuspended,
        emailVerification: user.emailVerification,
        userType: user.userType,
      };
      const accessToken = jwt.sign(userRes, "SECRET");
      if (user.emailVerification !== true) {
        const token = await createToken({
          userId: user._id,
        });
        // return
        const verifyEmailsubject = "Verify Email Address";
        const verifyEmailurl = `${process.env.FRONTEND_BASE_URL}/healthcare-email-verify.html?userId=${user._id}&token=${token.token}`;
        const verifyEmailtext = `
        <div
        style="background-color: #222533; padding: 20px; font-size: 14px; line-height: 1.43; font-family: &quot;Helvetica Neue&quot;, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 10px auto 20px; font-size: 12px; color: #A5A5A5; text-align: center;">If you
            are unable to see this message, <a href="#" style="color: #A5A5A5; text-decoration: underline;">click here to
                view in browser</a></div>
        <div
            style="max-width: 600px; margin: 0px auto; background-color: #fff; box-shadow: 0px 20px 50px rgba(0,0,0,0.05);">
            <table style="width: 100%;">
                <tr>
                    <td style="background-color: #fff;"><img alt="" src="img/logo.png" style="width: 70px; padding: 20px">
                    </td>
                    <td style="padding-left: 50px; text-align: right; padding-right: 20px;"><a href="#"
                            style="color: #261D1D; text-decoration: underline; font-size: 14px; letter-spacing: 1px;">Sign
                            In</a><a href="#"
                            style="color: #7C2121; text-decoration: underline; font-size: 14px; margin-left: 20px; letter-spacing: 1px;">Forgot
                            Password</a></td>
                </tr>
            </table>
            <div style="padding: 60px 70px; border-top: 1px solid rgba(0,0,0,0.05);">
                <h1 style="margin-top: 0px;">Hi ${user.name},</h1>
                <div style="color: #636363; font-size: 14px;">
                    <p>Thank you for creating account on our website, your nerve ID is <span style="font-weight: 900;color:black"> ${user.email} </span>, there is one more step before you can use it, you need
                        to activate your account by clicking the link below. Once you click the button, just login to your
                        account and you are set to go.</p>
                </div><a href=${verifyEmailurl}
                    style="padding: 8px 20px; background-color: #4B72FA; color: #fff; font-weight: bolder; font-size: 16px; display: inline-block; margin: 20px 0px; margin-right: 20px; text-decoration: none;">Activate
                    my account</a>
                <h4 style="margin-bottom: 10px;">Need Help?</h4>
                <div style="color: #A5A5A5; font-size: 12px;">
                    <p>If you have any questions you can simply reply to this email or find our contact information below.
                        Also contact us at <a href="#"
                            style="text-decoration: underline; color: #4B72FA;">test@example.com</a></p>
                </div>
            </div>
            <div style="background-color: #F5F5F5; padding: 40px; text-align: center;">
                <div style="margin-bottom: 20px;"><a href="#" style="display: inline-block; margin: 0px 10px;"><img alt=""
                            src="img/social-icons/twitter.png" style="width: 28px;"></a><a href="#"
                        style="display: inline-block; margin: 0px 10px;"><img alt="" src="img/social-icons/facebook.png"
                            style="width: 28px;"></a><a href="#" style="display: inline-block; margin: 0px 10px;"><img
                            alt="" src="img/social-icons/linkedin.png" style="width: 28px;"></a><a href="#"
                        style="display: inline-block; margin: 0px 10px;"><img alt="" src="img/social-icons/instagram.png"
                            style="width: 28px;"></a></div>
                <div style="margin-bottom: 20px;"><a href="#"
                        style="text-decoration: underline; font-size: 14px; letter-spacing: 1px; margin: 0px 15px; color: #261D1D;">Contact
                        Us</a><a href="#"
                        style="text-decoration: underline; font-size: 14px; letter-spacing: 1px; margin: 0px 15px; color: #261D1D;">Privacy
                        Policy</a><a href="#"
                        style="text-decoration: underline; font-size: 14px; letter-spacing: 1px; margin: 0px 15px; color: #261D1D;">Unsubscribe</a>
                </div>
                <div style="color: #A5A5A5; font-size: 12px; margin-bottom: 20px; padding: 0px 50px;">You are receiving this
                    email because you signed up for Light Admin. We use Light Admin to send our emails</div>
                <div style="margin-bottom: 20px;"><a href="#" style="display: inline-block; margin: 0px 10px;"><img alt=""
                            src="img/market-google-play.png" style="height: 33px;"></a><a href="#"
                        style="display: inline-block; margin: 0px 10px;"><img alt="" src="img/market-ios.png"
                            style="height: 33px;"></a></div>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.05);">
                    <div style="color: #A5A5A5; font-size: 10px; margin-bottom: 5px;">1073 Madison Ave, suite 649, New York,
                        NY 10001</div>
                    <div style="color: #A5A5A5; font-size: 10px;">Copyright 2018 Light Admin template. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
        const verifyEmailMailoptions = {
          from: process.env.AUTH_EMAIL,
          to: user.email,
          subject: verifyEmailsubject,
          html: verifyEmailtext,
        };
        await sendMail(verifyEmailMailoptions);

        return res.json({
          success: true,
          message: "A mail has been sent to your account kindly verify",
          data: { user: userRes, accessToken: null, chat },
        });
      }
      if (user.isVerify !== true) {
        const token = await createToken({
          userId: user._id,
        });
        //
        const verifysubject = "Update  Healthcare Profile";
        const verifyurl = `${process.env.FRONTEND_BASE_URL}/healthcare-profile-update.html?userId=${user._id}&token=${token.token}`;
        const verifytext = `
        <div
        style="background-color: #222533; padding: 20px; font-size: 14px; line-height: 1.43; font-family: &quot;Helvetica Neue&quot;, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 10px auto 20px; font-size: 12px; color: #A5A5A5; text-align: center;">If you
            are unable to see this message, <a href="#" style="color: #A5A5A5; text-decoration: underline;">click here to
                view in browser</a></div>
        <div
            style="max-width: 600px; margin: 0px auto; background-color: #fff; box-shadow: 0px 20px 50px rgba(0,0,0,0.05);">
            <table style="width: 100%;">
                <tr>
                    <td style="background-color: #fff;"><img alt="" src="img/logo.png" style="width: 70px; padding: 20px">
                    </td>
                    <td style="padding-left: 50px; text-align: right; padding-right: 20px;"><a href="#"
                            style="color: #261D1D; text-decoration: underline; font-size: 14px; letter-spacing: 1px;">Sign
                            In</a><a href="#"
                            style="color: #7C2121; text-decoration: underline; font-size: 14px; margin-left: 20px; letter-spacing: 1px;">Forgot
                            Password</a></td>
                </tr>
            </table>
            <div style="padding: 60px 70px; border-top: 1px solid rgba(0,0,0,0.05);">
                <h1 style="margin-top: 0px;">Hi ${user.name},</h1>
                <div style="color: #636363; font-size: 14px;">
                    <p>Kindly click the button to update healthcare profile.</p>
                </div><a href=${verifyurl}
                    style="padding: 8px 20px; background-color: #4B72FA; color: #fff; font-weight: bolder; font-size: 16px; display: inline-block; margin: 20px 0px; margin-right: 20px; text-decoration: none;">Update profile</a>
                <h4 style="margin-bottom: 10px;">Need Help?</h4>
                <div style="color: #A5A5A5; font-size: 12px;">
                    <p>If you have any questions you can simply reply to this email or find our contact information below.
                        Also contact us at <a href="#"
                            style="text-decoration: underline; color: #4B72FA;">test@example.com</a></p>
                </div>
            </div>
            <div style="background-color: #F5F5F5; padding: 40px; text-align: center;">
                <div style="margin-bottom: 20px;"><a href="#" style="display: inline-block; margin: 0px 10px;"><img alt=""
                            src="img/social-icons/twitter.png" style="width: 28px;"></a><a href="#"
                        style="display: inline-block; margin: 0px 10px;"><img alt="" src="img/social-icons/facebook.png"
                            style="width: 28px;"></a><a href="#" style="display: inline-block; margin: 0px 10px;"><img
                            alt="" src="img/social-icons/linkedin.png" style="width: 28px;"></a><a href="#"
                        style="display: inline-block; margin: 0px 10px;"><img alt="" src="img/social-icons/instagram.png"
                            style="width: 28px;"></a></div>
                <div style="margin-bottom: 20px;"><a href="#"
                        style="text-decoration: underline; font-size: 14px; letter-spacing: 1px; margin: 0px 15px; color: #261D1D;">Contact
                        Us</a><a href="#"
                        style="text-decoration: underline; font-size: 14px; letter-spacing: 1px; margin: 0px 15px; color: #261D1D;">Privacy
                        Policy</a><a href="#"
                        style="text-decoration: underline; font-size: 14px; letter-spacing: 1px; margin: 0px 15px; color: #261D1D;">Unsubscribe</a>
                </div>
                <div style="color: #A5A5A5; font-size: 12px; margin-bottom: 20px; padding: 0px 50px;">You are receiving this
                    email because you signed up for Light Admin. We use Light Admin to send our emails</div>
                <div style="margin-bottom: 20px;"><a href="#" style="display: inline-block; margin: 0px 10px;"><img alt=""
                            src="img/market-google-play.png" style="height: 33px;"></a><a href="#"
                        style="display: inline-block; margin: 0px 10px;"><img alt="" src="img/market-ios.png"
                            style="height: 33px;"></a></div>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.05);">
                    <div style="color: #A5A5A5; font-size: 10px; margin-bottom: 5px;">1073 Madison Ave, suite 649, New York,
                        NY 10001</div>
                    <div style="color: #A5A5A5; font-size: 10px;">Copyright 2018 Light Admin template. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
        const mailoptions = {
          from: process.env.AUTH_EMAIL,
          to: user.email,
          subject: verifysubject,
          html: verifytext,
        };
        // await sendMail(mailoptions);

        return res.json({
          success: true,
          message:
            "Sigin successfully,  a mail has been sent to your account kindly update healthcare profile",
          data: { user: userRes, accessToken, chat },
        });
      }
      const response = {
        user: userRes,
        accessToken,
        chat,
      };
      res.json({
        success: true,
        message: "Sigin successful",
        data: response,
      });
    } else {
      throw Error("Invalid Credentials");
    }
  } catch (err) {
    throw err;
  }
};

// logout user
const logoutUser = async ({ userId }) => {
  try {
    const user = await HospitalFacility.findOne({ _id: userId });
    if (!user) {
      throw Error("HospitalFacility does not exist");
    }
    // user.active = false;
    return user;
  } catch (err) {
    throw err;
  }
};
// update user
const updateUser = async (userId, data) => {
  try {
    const user = await HospitalFacility.updateOne({ _id: userId }, data);

    return user;
  } catch (err) {
    throw err;
  }
};
const getSingleUser = async (_id) => {
  try {
    const user = await HospitalFacility.findOne({ _id });
    return user;
  } catch (err) {
    throw err;
  }
};

const suspendHealthcare = async (_id) => {
  try {
    const user = await HospitalFacility.findOne({ _id });
    if (!user) {
      throw new Error("User not found");
    }
    user.isSuspended = true;
    const subject = "Diactivation of Healthcare";
    const text = `
    <div
    style="background-color: #222533; padding: 20px; font-size: 14px; line-height: 1.43; font-family: &quot;Helvetica Neue&quot;, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif;">

    <div
     style="max-width: 600px; margin: 0px auto;
      background-color: #fff;
       box-shadow: 0px 20px 50px rgba(0,0,0,0.05);">
       <h1>Diactivate ${user.name} Account</h1>
       <p>Hello ${user.name}  your healthcare account have been diactivate.</p>
       <p>Thanks.</p>
    </div>
    </div>

    `;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: user.email,
      subject,
      html: text,
    };
    await sendMail(mailOptions);
    await user.save();
    return user;
  } catch (err) {
    throw err;
  }
};
const activateHealthcare = async (_id) => {
  try {
    const user = await HospitalFacility.findOne({ _id });
    if (!user) {
      throw new Error("User not found");
    }
    user.isSuspended = false;

    const subject = "Activation of  Healthcare";
    const text = `
    <div
    style="background-color: #222533; padding: 20px; font-size: 14px; line-height: 1.43; font-family: &quot;Helvetica Neue&quot;, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif;">

    <div
     style="max-width: 600px; margin: 0px auto;
      background-color: #fff;
       box-shadow: 0px 20px 50px rgba(0,0,0,0.05);">
       <h1>Activation ${user.name} Account</h1>
       <p>Hello ${user.name}  your healthcare account have been activated.</p>
       <p>Thanks.</p>
    </div>
    </div>

    `;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: user.email,
      subject,
      html: text,
    };
    await sendMail(mailOptions);
    await user.save();
    return user;
  } catch (err) {
    throw err;
  }
};

const getAllUser = async () => {
  try {
    const users = await HospitalFacility.find();
    return users;
  } catch (err) {
    throw err;
  }
};

const updatePassword = async ({ userId, password }) => {
  try {
    const user = await HospitalFacility.findOne({ _id: userId }).select(
      "+password"
    );
    if (!user) {
      throw Error("HospitalFacility Account not found");
    }
    const hashPassword = await hashData(password);
    user.password = hashPassword;
    user.save();
    return { userId };
  } catch (err) {
    throw err;
  }
};
const deleteUser = async (userId) => {
  try {
    const user = await HospitalFacility.deleteOne({ _id: userId });
    return {
      user,
    };
  } catch (err) {
    throw err;
  }
};

export {
  createHospitalFacility,
  updatePassword,
  getAllUser,
  loginUser,
  logoutUser,
  updateUser,
  getSingleUser,
  deleteUser,
  suspendHealthcare,
  activateHealthcare,
};
