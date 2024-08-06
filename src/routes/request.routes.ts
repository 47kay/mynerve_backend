import express, { Request, Response } from "express";
import {
  requestByMail,
  getAllRequests,
  getHospitalRequests,
  getUserRequests,
  deleteRequests,
  approveRequest,
  disApproveRequest,
} from "../controllers/request.controller";
const router = express.Router();
import authenticate from "../middlewares/authenticate";
import sendMail from "../utils/sendMail";

//create requests
router.post(
  "/send/bymail",
  authenticate,
  async (req: Request, res: Response) => {
    const { facility, facilityEmail } = req.body;
    const user = req.body.user;

    try {
      const subject = "Authorization for Retrieval of Medical History";

      const text = `
    <div
    style="background-color: #222533; padding: 20px; font-size: 14px; line-height: 1.43; font-family: &quot;Helvetica Neue&quot;, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif;">

    <div
     style="max-width: 600px; margin: 0px auto;
      background-color: #fff;
       box-shadow: 0px 20px 50px rgba(0,0,0,0.05);">
       <table style="width: 100%;"><tbody><tr><td style="background-color: #fff;">
       <img alt="" src="img/logo.png" style="width: 70px; padding: 20px">
       </td><td style="padding-left: 50px; text-align: right; padding-right: 20px;">
       <a href="#" style="color: #261D1D; text-decoration: underline; font-size: 14px;
        letter-spacing: 1px;">Sign In</a></td></tr></tbody></table>
        <div style="padding: 60px 70px; border-top: 1px solid rgba(0,0,0,0.05);">
        <table style="margin-right: auto; margin-top: 0px; padding-top: 10px; margin-bottom: 20px;">
        <tbody><tr><td style="color: #111; font-size: 12px; padding: 0px 0px;">The Chief Medical Director</td>
        </tr><tr><td style="color: #B8B8B8; font-size: 12px; padding: 0px 0px;">Deda Hospital Limited</td>
        </tr><tr><td style="color: #B8B8B8; font-size: 12px; padding: 0px 0px;">Plot B07 Cadstrial Zone,</td>
        </tr><tr><td style="color: #B8B8B8; font-size: 12px; padding: 0px 0px;">Behind ABC Cargo, Katampe.</td>
        </tr><tr><td style="color: #B8B8B8; font-size: 12px; padding: 0px 0px;">FCT. Abuja. Nigeria.</td>
        </tr></tbody></table>
    <div style="font-size: 10px; color: #111; font-weight: bold; margin-bottom:10px;">AUTHORIZATION FOR RETRIEVAL OF MEDICAL HISTORY</div>
    <div style="color: #636363; font-size: 11.5px;">
    <p>I hope this letter finds you well. I am writing to authorize the release of my complete medical history to nerve Inc who will be acting on my
     behalf to retrieve my medical history henceforth. Please find my details below: </p></div>
    <table style="margin-top: 10px; width: 100%;"><tbody><tr><td style="padding-right: 30px;">
    <div style="text-transform: uppercase; font-size: 10px; letter-spacing: 1px; font-weight: bold; color: #B8B8B8; 
    margin-bottom: 5px;">Nerve IDENTIFICATION #: nv5**1ID</div><div style="text-transform: uppercase; font-size: 10px;
     letter-spacing: 1px; font-weight: bold; color: #B8B8B8; margin-bottom: 5px;">HEALTHCARE PROVIDER: NATIONAL HOSPITAL</div>
    
    <div style="text-transform: uppercase; font-size: 10px; letter-spacing: 1px; font-weight: bold; color: #B8B8B8; margin-bottom: 5px;"
    >HOSPITAL IDENTIFICATION #: 85453</div><div style="font-size: 10px; color: #111; font-weight: bold; margin-bottom:10px;">
    NAME OF PATIENT: <span style="text-transform: uppercase">${user.firstName} ${user.lastName}</span>
    </div></td></tr></tbody></table><div style="color: #636363; font-size: 11px;"><p>Please be advised that I authorize
     nerve Inc to access and retrieve all of my medical records, including but not limited to:</p></div>
    <table style="margin-top: 20px; width: 100%;"><tbody><tr><td style="padding-right: 30px;">
    <div style="text-transform: uppercase; font-size: 10px; letter-spacing: 1px; font-weight: bold; color: #B8B8B8; 
    margin-bottom: 5px;">Medical examinations</div><div style="text-transform: uppercase; font-size: 10px;
     letter-spacing: 1px; font-weight: bold; color: #B8B8B8; margin-bottom: 5px;">Laboratory test results</div>
    
    <div style="text-transform: uppercase; font-size: 10px; letter-spacing: 1px; font-weight: bold;
     color: #B8B8B8; margin-bottom: 5px;">Treatment plans</div>
    <div style="text-transform: uppercase; font-size: 10px; letter-spacing: 1px; font-weight: bold; 
    color: #B8B8B8; margin-bottom: 5px;">Medication history</div></td><td style="max-width: 150px;">
    <div style="text-transform: uppercase; font-size: 10px; letter-spacing: 1px; font-weight: bold; 
    color: #B8B8B8; margin-bottom: 5px;">Surgical procedures</div>
    <div style="text-transform: uppercase; font-size: 10px; letter-spacing: 1px; font-weight: bold;
     color: #B8B8B8; margin-bottom: 5px;">Diagnostic imaging</div>
    <div style="text-transform: uppercase; font-size: 10px; letter-spacing: 1px; font-weight: bold; 
    color: #B8B8B8; margin-bottom: 5px;">Consultation notes</div><div style="text-transform: uppercase; 
    font-size: 10px; letter-spacing: 1px; font-weight: bold; color: #B8B8B8; margin-bottom: 5px;">
    ALL MEDICAL SERVICES</div></td></tr></tbody></table>
    <div style="color: #636363; font-size: 11px;"><p>This authorization is valid from [Start Date] to [End Date],
     unless otherwise revoked in writing by me. I understand that this information may contain sensitive and confidential
      data and that nerve Inc is bound by confidentiality and privacy regulations to ensure the protection of my personal 
      health information.</p><p>I kindly request that you provide nerve Inc with any necessary forms, procedures, or 
      documentation required to facilitate the retrieval of my medical history. If there are any associated fees or costs, please inform me accordingly.
    </p><p>Thank you for your prompt attention to this matter and your assistance in ensuring that nerve Inc can obtain 
    the necessary information for the purpose(s) stated above. Should you require any further information or clarification, 
    please do not hesitate to contact me at ${user.email}</p></div><table style="margin-right: auto; margin-top: 0px; padding-top: 10px;
     margin-bottom: 10px;"><tbody><tr><td style="color: #B8B8B8; font-size: 12px; padding: 0px 0px;">Warm Regards.</td></tr><tr>
     <td style="color: #111; font-size: 12px; padding: 0px 0px;text-transform: uppercase">${user.firstName} ${user.lastName}</td></tr></tbody></table>
    <a href="#" style="padding: 8px 20px; background-color: #4B72FA; color: #fff; font-weight: bolder; font-size: 12px; 
    display: inline-block; margin: 20px 0px; margin-right: 20px; text-decoration: none;">Upload History</a></div>
    <div style="background-color: #F5F5F5; padding:20px; text-align: center;"><div style="margin-top: 20px; padding-top: 5px;
     border-top: 1px solid rgba(0,0,0,0.05);"><div style="color: #A5A5A5; font-size: 10px; margin-bottom: 5px;">
     1073 Madison Ave, suite 649, New York, NY 10001</div><div style="color: #A5A5A5; font-size: 10px;">Copyright 2018 Light Admin 
     template. All rights reserved.</div></div></div></div>
    </div>
    `;

      if (facility.length >= 1) {
        for (const e of facility) {
          const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: e.data.email,
            subject,
            html: text,
          };
          await sendMail(mailOptions);
        }
      }

      if (facilityEmail) {
        const mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: facilityEmail,
          subject,
          html: text,
        };
        await sendMail(mailOptions);
      }

      const requests = await requestByMail(req.body);
      res.json({
        success: true,
        data: requests,
      });
    } catch (err) {
      res.status(400).json({
        status: "FAILED",
        message: err.message,
      });
    }
  }
);
// all requests
router.get("/all", authenticate, async (req: Request, res: Response) => {
  try {
    const allrequestss = await getAllRequests();
    res.json({
      success: true,
      data: allrequestss,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// single user requests
router.get(
  "/user/:userId",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const response = await getUserRequests(req.params.userId);
      res.json({
        success: true,
        data: response,
      });
    } catch (err) {
      res.status(400).json({
        status: "FAILED",
        message: err.message,
      });
    }
  }
);
// get hospital request
router.get(
  "/hospital/:hospitalId",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const response = await getHospitalRequests(req.params.hospitalId);
      res.json({
        success: true,
        data: response,
      });
    } catch (err) {
      res.status(400).json({
        status: "FAILED",
        message: err.message,
      });
    }
  }
);
// approve request
router.post(
  "/approve:/requestId",
  authenticate,
  async (req: Request, res: Response) => {
    const { requestId } = req.body;
    const user = req.body.user;
    try {
      const allrequestss = await approveRequest(requestId);
      const subject = "Approval for Retrieval of Medical History";
      const text = `
   
    `;
      const mailoptions = {
        from: process.env.AUTH_EMAIL,
        to: user.email,
        subject,
        html: text,
      };
      await sendMail(mailoptions);

      res.json({
        success: true,
        message: "Request Approve",
        data: allrequestss,
      });
    } catch (err) {
      res.status(400).json({
        status: "FAILED",
        message: err.message,
      });
    }
  }
);
// disapprove request
router.post(
  "/disapprove",
  authenticate,
  async (req: Request, res: Response) => {
    const user = req.body.user;
    try {
      const response = await disApproveRequest(req.body);
      const subject = "Disapproval for Retrieval of Medical History";
      const text = ``;

      await sendMail({
        userId: user.userId,
        email: user.email,
        subject,
        text,
      });

      res.json({
        success: true,
        message: "Request disApprove",
        data: response,
      });
    } catch (err) {
      res.status(400).json({
        status: "FAILED",
        message: err.message,
      });
    }
  }
);
// delete requests
router.delete(
  "/delete/:id",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const response = await deleteRequests(req.params.id);

      res.json({
        success: true,
        message: "requests deleted",
        data: response,
      });
    } catch (err) {
      res.status(400).json({
        status: "FAILED",
        message: err.message,
      });
    }
  }
);

export default router;
