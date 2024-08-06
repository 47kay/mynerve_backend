import express, { Request, Response } from "express";
import {
  createChat,
  deleteChat,
  findUserChats,
  findInitialChatForHealthcare,
  findRecentChatInteraction,
} from "../controllers/chat.controller";
const router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  try {
    const response = await createChat(req.body);

    res.json({
      success: true,
      chat: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});

router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const response = await findUserChats(req.params.userId);

    res.json({
      success: true,
      chats: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
router.get("/recent/:userId", async (req: Request, res: Response) => {
  try {
    const response = await findRecentChatInteraction(req.params.userId);

    res.json({
      success: true,
      recentInteraction: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});

router.get("/find/:firstId/:secondId", async (req: Request, res: Response) => {
  try {
    const response = await findInitialChatForHealthcare(
      req.params.firstId,
      req.params.secondId
    );

    res.json({
      success: true,
      chat: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const response = await deleteChat(req.params.id);

    res.json({
      success: true,
      message: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});

export default router;
