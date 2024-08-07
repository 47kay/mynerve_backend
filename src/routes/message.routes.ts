import express, { Request, Response } from "express";
import {
  createMessage,
  getMessages,
  deleteMessages,
} from "../controllers/message.controller";
const router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  try {
    const response = await createMessage(req.body);

    res.json({
      success: true,
      message: response,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/chat/:chatId", async (req: Request, res: Response) => {
  try {
    const response = await getMessages(req.params.chatId);

    res.json({
      success: true,
      messages: response,
    });
  } catch (err) {
    res.json({
      success: false,
      messages: err.message,
    });
  }
});
router.delete("/delete", async (req: Request, res: Response) => {
  try {
    const response = await deleteMessages(req.body.chatId);

    res.json({
      success: true,
      message: response,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
