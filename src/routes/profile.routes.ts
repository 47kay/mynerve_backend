import express, { Request, Response } from "express";
import {
  getAllProfile,
  deleteProfile,
  updateProfile,
  getSingleProfile,
  createNewProfile,
  findUserByNerveId,
} from "../controllers/profile.controller";
const router = express.Router();
import authenticate from "../middlewares/authenticate";

//create profile
router.post("/create", authenticate, async (req: Request, res: Response) => {
  try {
    const profile = await createNewProfile(req.body, "signup");
    res.json({
      success: true,
      data: profile,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});

// find user profile by nerveId
router.post(
  "/findbyNerveId",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const profile = await findUserByNerveId(req.body);
      res.json({
        success: true,
        data: profile,
      });
    } catch (err) {
      res.status(400).json({
        status: "FAILED",
        message: err.message,
      });
    }
  }
);
// all Profile
router.get("/all", authenticate, async (req: Request, res: Response) => {
  try {
    const allProfiles = await getAllProfile();
    res.json({
      success: true,
      data: allProfiles,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// single Profile
router.get("/user/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const response = await getSingleProfile(req.params.id);
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
});

// update Profile
router.put("/update/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const response = await updateProfile(req.params.id, req.body);

    res.json({
      success: true,
      message: "Profile Updated",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// delete Profile
router.delete(
  "/delete/:id",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const response = await deleteProfile(req.params.id);

      res.json({
        success: true,
        message: "Profile deleted",
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
