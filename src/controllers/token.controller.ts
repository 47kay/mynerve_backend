import Token from "../domains/token/model";
import User from "../domains/user/model";
import HospitalFacility from "../domains/hospital_facility/model";
import { hashData } from "../utils/hashData";

const createToken = async ({ userId }) => {
  try {
    const data = userId.toString();
    const crypto = await hashData(data);
    const formatedCrypto = crypto.replace(/\//g, "");
    const token = new Token({
      userId: data,
      token: formatedCrypto,
    });
    await token.save();
    return token;
  } catch (err) {
    throw err;
  }
};

const verifyTokenForEmail = async (userId, tokenCode) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User not found");
    }

    const token = await Token.findOne({ userId, token: tokenCode });
    if (!token) {
      throw new Error("Token not found");
    }

    // if (token.expiresAt < Date.now()) {
    //   throw new Error("Token has expired");
    // }

    await User.updateOne(
      { _id: userId },
      { $set: { emailVerification: true } }
    );
    await Token.deleteMany({ userId });

    return {
      verify: true,
      userId,
    };
  } catch (err) {
    throw err;
  }
};
const verifyHospitalFacilityTokenForEmail = async (userId, tokenCode) => {
  try {
    const user = await HospitalFacility.findOne({ _id: userId });
    if (!user) {
      throw new Error("Hospital facility not found");
    }

    const token = await Token.findOne({ userId, token: tokenCode });
    if (!token) {
      throw new Error("Token not found");
    }

    // if (token.expiresAt < Date.now()) {
    //   throw new Error("Token has expired");
    // }

    await HospitalFacility.updateOne(
      { _id: userId },
      { $set: { emailVerification: true } }
    );
    await Token.deleteMany({ userId });

    return {
      verify: true,
      HospitalFacilityId: userId,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const verifyTokenForgetPassword = async (userId, tokenCode) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User not found");
    }

    const token = await Token.findOne({ userId, token: tokenCode });
    if (!token) {
      throw new Error("Token not found");
    }

    // if (token.expiresAt < Date.now()) {
    //   throw new Error("Token has expired");
    // }

    return {
      verify: true,
      userId,
    };
  } catch (err) {
    throw err;
  }
};

export {
  createToken,
  verifyTokenForEmail,
  verifyTokenForgetPassword,
  verifyHospitalFacilityTokenForEmail,
};
