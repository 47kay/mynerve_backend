import express, { Request, Response } from "express";
import {} from "../controllers/facility.controller";
const router = express.Router();
import authenticate from "../middlewares/authenticate";
import {
  createNewHospitalFacilityProfile,
  deleteHospitalFacilityProfile,
  getAllHospitalFacilityProfile,
  getSingleHospitalFacilityProfile,
  updateHospitalFacilityProfile,
} from "../controllers/provider.controller";

//create profile
router.post("/create", authenticate, async (req: Request, res: Response) => {
  try {
    const profile = await createNewHospitalFacilityProfile(req.body, "signup");
    res.json({
      success: true,
      data: profile,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// all Profile
router.get("/all", authenticate, async (req: Request, res: Response) => {
  try {
    const allProfiles = await getAllHospitalFacilityProfile();
    res.json({
      success: true,
      data: allProfiles,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});
// single Profile
router.get("/user/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const response = await getSingleHospitalFacilityProfile(req.params.id);
    res.json({
      success: true,
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// update Profile
router.put("/update/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const response = await updateHospitalFacilityProfile(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Profile Updated",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
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
      const response = await deleteHospitalFacilityProfile(req.params.id);

      res.json({
        success: true,
        message: "Profile deleted",
        data: response,
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
