import express, { Request, Response } from "express";
import userRoutes from "./user.routes";
import profileRoutes from "./profile.routes";
import requestRoutes from "./request.routes";
import tokenRoutes from "./token.routes";
import chatRoutes from "./chat.routes";
import connectionRoutes from "./connection.routes";
import recordRoutes from "./record.routes";
import messageRoutes from "./message.routes";
import adminRoutes from "./admin.routes";
import facilityRoutes from "./facility.routes";
import providerRoutes from "./provider.routes";
import tipRoutes from "./tip.routes";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/profile", profileRoutes);
router.use("/request", requestRoutes);
router.use("/medical-records", recordRoutes);
router.use("/token", tokenRoutes);
router.use("/chat", chatRoutes);
router.use("/message", messageRoutes);
router.use("/super-admin", adminRoutes);
router.use("/hospital-facility", facilityRoutes);
router.use("/hospital-profile", providerRoutes);
router.use("/connection", connectionRoutes);
router.use("/tips", tipRoutes);

export default router;
