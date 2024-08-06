import User from "../domains/super_admins/model";
import comparedHashedData from "../utils/compareHashedData";
import { hashData } from "../utils/hashData";
import jwt from "jsonwebtoken";

// signup // create a new user
const createNewUser = async (data) => {
  try {
    const { username, password } = data;

    // Checking if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      // A user already exists
      throw Error("User with the provided email already exists");
    } else {
      // hash password
      const hashedPassword = await hashData(password);
      // Try to create new user
      const newUser = new User({
        username,
        password: hashedPassword,
      });
      // save user
      const createdUser = await newUser.save();
      return createdUser;
    }
  } catch (err) {
    // console.log(err)
    throw err;
  }
};

const loginUser = async ({ username, password }, res) => {
  try {
    if (!username || !password) {
      throw Error("Empty fields not allowed");
    }
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      throw Error("Super Admin does not exist");
    }
    const comparedHashedPass = await comparedHashedData(
      password,
      user.password
    );
    if (comparedHashedPass === true) {
      const userRes = {
        _id: user._id,
        username: user.username,
        userType: user.userType,
      };

      const accessToken = jwt.sign(userRes, "SECRET");

      const response = {
        user: userRes,
        accessToken,
      };
      res.json({
        success: true,
        message: "Sigin successful",
        data: response,
      });
    } else {
      throw Error("Invalid Credentials");
    }
  } catch (err) {
    throw err;
  }
};

// logout user
const logoutUser = async ({ userId }) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw Error("User does not exist");
    }
    // user.active = false;
    return user;
  } catch (err) {
    throw err;
  }
};
// update user
const updateUser = async (userId, data) => {
  try {
    const user = await User.updateOne({ _id: userId }, data);

    return user;
  } catch (err) {
    throw err;
  }
};
const getSingleUser = async (_id) => {
  try {
    const user = await User.findOne({ _id });
    return user;
  } catch (err) {
    throw err;
  }
};
const getAllUser = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw err;
  }
};

const updatePassword = async ({ userId, password }) => {
  try {
    const user = await User.findOne({ _id: userId }).select("+password");
    if (!user) {
      throw Error("User Account not found");
    }
    const hashPassword = await hashData(password);
    user.password = hashPassword;
    user.save();
    return { userId };
  } catch (err) {
    throw err;
  }
};
const deleteUser = async (userId) => {
  try {
    const user = await User.deleteOne({ _id: userId });
    return {
      user,
    };
  } catch (err) {
    throw err;
  }
};

export {
  createNewUser,
  updatePassword,
  getAllUser,
  loginUser,
  logoutUser,
  updateUser,
  getSingleUser,
  deleteUser,
};
