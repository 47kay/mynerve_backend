import HospitalFacilityProfile from "../domains/hospital_profile/model";

// create a new HospitalFacilityProfile
const createNewHospitalFacilityProfile = async (data, type) => {
  try {
    if (type === "signup") {
      const newProfile = new HospitalFacilityProfile({
        hospitalFacilityId: data,
      });
      // save HospitalFacilityProfile
      const createdProfile = await newProfile.save();
      return createdProfile;
    } else {
      const newProfile = new HospitalFacilityProfile(data);
      // save HospitalFacilityProfile
      const createdProfile = await newProfile.save();
      return createdProfile;
    }
  } catch (err) {
    throw err;
  }
};

// update HospitalFacilityProfile
const updateHospitalFacilityProfile = async (ProfileId, data) => {
  try {
    // Find the hospital facility profile by its ID and update it with the provided data
    const profile = await HospitalFacilityProfile.findByIdAndUpdate(
      { _id: ProfileId },
      data
    ).populate("hospitalFacilityId");

    // If no profile found, throw an error
    if (!profile) {
      throw new Error("No HospitalFacilityProfile with this ID");
    }

    // profile.hospitalFacilityId.isProfileUpdate = true;

    // Save the changes to persist them in the database
    // await profile.hospitalFacilityId.save();

    // Return the updated profile
    return profile;
  } catch (err) {
    // If any error occurs, throw it for handling at the higher level
    throw err;
  }
};

const getSingleHospitalFacilityProfile = async (_id) => {
  try {
    const profile = await HospitalFacilityProfile.findOne({
      hospitalFacilityId: _id,
    }).populate("hospitalFacilityId");
    if (!profile) throw Error("No profile found with this user id");
    return profile;
  } catch (err) {
    throw err;
  }
};
const getAllHospitalFacilityProfile = async () => {
  try {
    const profiles = await HospitalFacilityProfile.find().populate(
      "hospitalFacilityId"
    );
    return profiles;
  } catch (err) {
    throw err;
  }
};
const deleteHospitalFacilityProfile = async (ProfileId) => {
  try {
    const profile = await HospitalFacilityProfile.deleteOne({ _id: ProfileId });
    return {
      profile,
    };
  } catch (err) {
    throw err;
  }
};

export {
  createNewHospitalFacilityProfile,
  getAllHospitalFacilityProfile,
  updateHospitalFacilityProfile,
  getSingleHospitalFacilityProfile,
  deleteHospitalFacilityProfile,
};
