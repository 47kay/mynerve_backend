import express, { Request, Response } from "express";
import {
  saveRecords,
  getAllRecords,
  getSingleRecords,
  updateRecords,
  deleteRecords,
} from "../controllers/records.controller";
const router = express.Router();
import authenticate from "../middlewares/authenticate";

//create records
router.post("/add", authenticate, async (req: Request, res: Response) => {
  try {
    const records = await saveRecords(req.body);
    res.json({
      success: true,
      data: records,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// all records
router.get("/all", authenticate, async (req: Request, res: Response) => {
  try {
    const allrecordss = await getAllRecords();
    res.json({
      success: true,
      data: allrecordss,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});
// single records
router.get("/user/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const response = await getSingleRecords(req.params.id);
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

// update records
router.put("/update/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const response = await updateRecords(req.params.id, req.body);

    res.json({
      success: true,
      message: "records Updated",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});
// delete records
router.delete(
  "/delete/:id",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const response = await deleteRecords(req.params.id);

      res.json({
        success: true,
        message: "records deleted",
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
