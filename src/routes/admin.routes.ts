import express, { Request, Response } from "express";
import {
  createNewUser,
  getAllUser,
  deleteUser,
  loginUser,
  updatePassword,
  updateUser,
  getSingleUser,
} from "../controllers/user.controller";
const router = express.Router();
import authenticate from "../middlewares/authenticate";

router.post("/create", async (req: Request, res: Response) => {
  try {
    let { username, password } = req.body;
    username = username.trim();
    password = password.trim();

    if (username == "" || password == "") {
      throw Error("Empty input fields!");
    } else if (password.length < 6) {
      throw Error("Password is too short!");
    } else {
      // valid credentials
      const newUser = await createNewUser({
        username,
        password,
      });

      res.json({
        success: true,
        message: "Super admin created",
        data: newUser,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// signin
router.post("/signin", async (req: Request, res: Response) => {
  try {
    const response = await loginUser(req.body, res);
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// all user
router.get("/all", authenticate, async (req: Request, res: Response) => {
  try {
    const allusers = await getAllUser();
    res.json({
      success: true,
      data: allusers,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// single user
router.get("/single/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const response = await getSingleUser(req.params.id);
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

router.post("/update-password", async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    if (password.length < 6) {
      throw Error("Password is too short!");
    }
    const response = await updatePassword(req.body);
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
// update user
router.put("/update/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const response = await updateUser(req.params.id, req.body);

    res.json({
      success: true,
      message: "User Updated",
      data: response,
    });
  } catch (err) {
    res.status(400).json({
      status: "FAILED",
      message: err.message,
    });
  }
});
// delete user
router.delete(
  "/delete/:id",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const response = await deleteUser(req.params.id);

      res.json({
        success: true,
        message: "User deleted",
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
