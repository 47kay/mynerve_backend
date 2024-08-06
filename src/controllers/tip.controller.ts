import Tips from "../domains/tips/model";

const createTip = async (data) => {
  const { title, description, startDate, endDate } = data;
  try {
    const tip = new Tips({
      startDate,
      endDate,
      title,
      description,
    });
    await tip.save();
    return tip;
  } catch (err) {
    throw err;
  }
};

const getAllTips = async () => {
  try {
    const rs = await Tips.find();
    return rs;
  } catch (err) {
    throw err;
  }
};

const updateTips = async (tipId, data) => {
  try {
    const tip = await Tips.updateOne({ _id: tipId }, data);

    return tip;
  } catch (err) {
    throw err;
  }
};
const deleteTips = async (tipId) => {
  try {
    const tip = await Tips.deleteOne({ _id: tipId });
    return tip;
  } catch (err) {
    throw err;
  }
};
export { createTip, getAllTips, updateTips, deleteTips };
