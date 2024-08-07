import express, { Request, Response } from "express";
const router = express.Router();
import {
  getAllTips,
  createTip,
  updateTips,
  deleteTips,
} from "../controllers/tip.controller";

router.post("/create", async (req: Request, res: Response) => {
  try {
    const token = await createTip(req.body);
    res.json({
      success: true,
      message: "Healthcare tips created",
      data: token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/all", async (req: Request, res: Response) => {
  try {
    const tips = await getAllTips();
    res.json({
      success: true,
      data: tips,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

router.put("/update/:id", async (req: Request, res: Response) => {
  try {
    const tips = await updateTips(req.params.id, req.body);
    res.json({
      success: true,
      data: tips,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});
//delete user
router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const response = await deleteTips(req.params.id);

    res.json({
      success: true,
      message: "Tip deleted",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
