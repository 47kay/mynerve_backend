import bcrypt from "bcrypt";

const comparedHashedData = async (data, hashedData) => {
  try {
    const comparedData = await bcrypt.compare(data, hashedData);
    return comparedData;
  } catch (err) {
    throw err;
  }
};
export default comparedHashedData;
