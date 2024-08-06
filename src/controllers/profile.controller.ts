import User from "../domains/user/model";
import Profile from "../domains/profile/model";

// create a new Profile
const createNewProfile = async (data, type) => {
  try {
    if (type === "signup") {
      const newProfile = new Profile(data);
      // save Profile
      const createdProfile = await newProfile.save();
      return createdProfile;
    } else {
      const newProfile = new Profile(data);
      // save Profile
      const createdProfile = await newProfile.save();
      return createdProfile;
    }
  } catch (err) {
    throw err;
  }
};

// update Profile
const updateProfile = async (ProfileId, data) => {
  try {
    const profile = await Profile.updateOne({ _id: ProfileId }, data);
    if (!profile) throw Error("No Profile with this ID");
    return profile;
  } catch (err) {
    throw err;
  }
};
const getSingleProfile = async (_id) => {
  try {
    const profile = await User.findOne({ _id }).populate("profile");
    if (!profile) throw Error("No profile found with this user id");
    return profile;
  } catch (err) {
    throw err;
  }
};
const getAllProfile = async () => {
  try {
    const profiles = await User.find().populate("profile");
    return profiles;
  } catch (err) {
    throw err;
  }
};
const findUserByNerveId = async (data) => {
  try {
    const { nerveId } = data;
    // Use Mongoose query to filter profiles directly
    const sortedProfiles = await User.find({
      nerveId: { $regex: nerveId, $options: "i" },
    }).populate("profile");

    return sortedProfiles;
  } catch (err) {
    throw err; // Re-throw the error to be handled by the caller
  }
};

const deleteProfile = async (ProfileId) => {
  try {
    const profile = await Profile.deleteOne({ _id: ProfileId });
    return {
      profile,
    };
  } catch (err) {
    throw err;
  }
};

export {
  createNewProfile,
  getAllProfile,
  updateProfile,
  getSingleProfile,
  deleteProfile,
  findUserByNerveId,
};
