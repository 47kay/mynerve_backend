export const uploadImage = async (image) => {
  try {
    const imageDir = `${Date.now() + image.name}`;
    const path = __dirname + "/images/" + imageDir;
    image.mv(path, (err) => {
      if (err) throw err;
      return { path };
    });
    return imageDir;
  } catch (err) {
    throw err;
  }
};
