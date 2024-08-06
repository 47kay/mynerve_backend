import express, { Request, Response } from "express";
import {
  makeConnect,
  getAllConnection,
  getUserConnection,
  approveConnection,
  disApproveConnection,
  deleteConnection,
  getUserConnectionRequest,
  getUserRelatedConnection,
} from "../controllers/connection.controller";
const router = express.Router();
import authenticate from "../middlewares/authenticate";
import sendMail from "../utils/sendMail";

//create connection
router.post("/make", authenticate, async (req: Request, res: Response) => {
  const requests = req.body;
  const user = req.body.user;

  try {
    for (const request of requests) {
      const { bloodlineEmail, bloodline } = request;

      // Input validation
      if (!bloodlineEmail) {
        return res.status(400).json({
          status: "FAILED",
          message: "Bloodline email is required.",
        });
      }

      const subject = bloodline
        ? "Connection Request"
        : "Invitation Request To Join Nerve";
      const text = `
      <div style="background-color: #222533; padding: 20px; font-size: 14px; line-height: 1.43; font-family: 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0px auto; background-color: #fff; box-shadow: 0px 20px 50px rgba(0,0,0,0.05);">
          <h1>${subject}.</h1>
          <p>${user.firstName} ${user.lastName} sent a 
          ${bloodline ? "connection" : "invitation"} request ${
        bloodline ? "" : "<a href='https://nervee.netlify.app/login'>link</a>"
      } kindly check it out.</p>
        </div>
      </div>
      `;

      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: bloodlineEmail,
        subject,
        html: text,
      };
      await sendMail(mailOptions);

      if (bloodline) {
        await makeConnect(request);
      }
    }

    res.json({
      success: true,
      message: "Connection requests processed successfully.",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// all connection
router.get("/all", authenticate, async (req: Request, res: Response) => {
  try {
    const connections = await getAllConnection();
    res.json({
      success: true,
      data: connections,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// get user connection
router.get(
  "/user/:userId/:profileId",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const response = await getUserConnection(req.params.userId);
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
// get user connection request that isAccepted = false
router.get(
  "/requests/:userId",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const response = await getUserConnectionRequest(req.params.userId);
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

// get user related connection that isAccepted = true
router.post(
  "/related/bloodline",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const response = await getUserRelatedConnection(req.body);
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
router.post("/accept", authenticate, async (req: Request, res: Response) => {
  const { connectionId, bloodlineEmail } = req.body;
  const user = req.body.user;

  try {
    const connection = await approveConnection(connectionId);
    const subject = "Connection Request Accepted";

    const text = `
    <div
    style="background-color: #222533; padding: 20px; font-size: 14px; line-height: 1.43; font-family: &quot;Helvetica Neue&quot;, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif;">

    <div
     style="max-width: 600px; margin: 0px auto;
      background-color: #fff;
       box-shadow: 0px 20px 50px rgba(0,0,0,0.05);">
       <h1>Connection request Accepted</h1>
       <p>${user.firstName} ${user.lastName} has accept your connection request </p>
    </div>
    </div>

    `;
    const mailoptions = {
      from: process.env.AUTH_EMAIL,
      to: bloodlineEmail,
      subject,
      html: text,
    };
    await sendMail(mailoptions);

    res.json({
      success: true,
      message: "Connection Request Accepted",
      data: connection,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// disapprove request
router.post("/reject", authenticate, async (req: Request, res: Response) => {
  const { connectionId, bloodlineEmail } = req.body;

  const user = req.body.user;
  try {
    const response = await disApproveConnection(connectionId);
    const subject = "Connection Request Rejected";

    const text = `
    <div
    style="background-color: #222533; padding: 20px; font-size: 14px; line-height: 1.43; font-family: &quot;Helvetica Neue&quot;, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif;">

    <div
     style="max-width: 600px; margin: 0px auto;
      background-color: #fff;
       box-shadow: 0px 20px 50px rgba(0,0,0,0.05);">
       <h1>Connection request Rejected</h1>
       <p>${user.firstName} ${user.lastName} has reject your connection request </p>
    </div>
    </div>

    `;
    const mailoptions = {
      from: process.env.AUTH_EMAIL,
      to: bloodlineEmail,
      subject,
      html: text,
    };
    await sendMail(mailoptions);
    await deleteConnection(connectionId);

    res.json({
      success: true,
      message: "Connection rejected",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// delete connection
router.delete(
  "/delete/:id",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const response = await deleteConnection(req.params.id);

      res.json({
        success: true,
        message: "connection deleted",
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
