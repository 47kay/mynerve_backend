import express, { Request, Response } from "express";
const router = express.Router();
import {
  createToken,
  verifyTokenForgetPassword,
  verifyTokenForEmail,
  verifyHospitalFacilityTokenForEmail,
} from "../controllers/token.controller";
import sendMail from "../utils/sendMail";

router.post("/create", async (req: Request, res: Response) => {
  try {
    const token = await createToken(req.body);
    res.json({
      success: true,
      message: "Token created",
      data: token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});
router.post("/resend-verification", async (req: Request, res: Response) => {
  const { userId, firstName, email, nerveId, subject } = req.body;

  try {
    const token = await createToken({
      userId,
    });

    const url = `${process.env.FRONTEND_BASE_URL}/email-verify.html?userId=${userId}&token=${token.token}`;
    const text = `
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
            <h1 style="margin-top: 0px;">Hi ${firstName},</h1>
            <div style="color: #636363; font-size: 14px;">
                <p>Thank you for creating account on our website, your nerve ID is <span style="font-weight: 900;color:black"> ${nerveId} </span>, there is one more step before you can use it, you need
                    to activate your account by clicking the link below. Once you click the button, just login to your
                    account and you are set to go.</p>
            </div><a href=${url}
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
    const mailoptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject,
      html: text,
    };
    await sendMail(mailoptions);
    res.json({
      success: true,
      message: "Verification Mail sent to your email address, kindly verify ",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

router.get(
  "/user/:userId/verify/:token",
  async (req: Request, res: Response) => {
    try {
      const token = await verifyTokenForEmail(
        req.params.userId,
        req.params.token
      );
      res.json({
        success: true,
        message: "Email Verified",
        data: token,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
);
router.get(
  "/hospital-facility/:userId/verify/:token",
  async (req: Request, res: Response) => {
    try {
      const token = await verifyHospitalFacilityTokenForEmail(
        req.params.userId,
        req.params.token
      );
      res.json({
        success: true,
        message: "Healthcare facility email verified",
        data: token,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
);
router.get(
  "/password/:userId/verify/:token",
  async (req: Request, res: Response) => {
    try {
      const token = await verifyTokenForgetPassword(
        req.params.userId,
        req.params.token
      );
      res.json({
        success: true,
        message: "Token Verified",
        data: token,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
);

export default router;
