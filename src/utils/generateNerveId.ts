let generatedStrings = new Set();

function generateNerveId() {
  const chars = [
    "0123456789", // Numbers
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // Uppercase letters
  ];

  let randomString = "nv"; // 'nv' constant

  // Generate random numbers
  for (let i = 0; i < 2; i++) {
    const charSet = chars[0]; // Numbers
    const randomIndex = Math.floor(Math.random() * charSet.length);
    randomString += charSet[randomIndex];
  }

  // Generate random letters (uppercase)
  for (let i = 0; i < 3; i++) {
    const charSet = chars[1]; // Uppercase letters
    const randomIndex = Math.floor(Math.random() * charSet.length);
    randomString += charSet[randomIndex];
  }

  // Check if the generated string is unique
  if (generatedStrings.has(randomString)) {
    // If not unique, generate again
    return generateNerveId();
  } else {
    // If unique, add to the set of generated strings and return
    generatedStrings.add(randomString);
    return randomString;
  }
}

export default generateNerveId;
