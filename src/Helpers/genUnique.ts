export const generateUniqueColor = (): string => {
  // Generate a random number between 0 and 16777215 (hexadecimal range for colors)
  const randomColor: string = Math.floor(Math.random() * 16777215).toString(16);

  // Ensure the color code is 6 characters long by padding with leading zeros if necessary
  return `#${randomColor.padStart(6, "0")}`;
};

export const generateUniqueId = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  const base = characters.length;

  const timestamp = Date.now();
  let uniqueId = "";

  // Generate random component
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * base);
    uniqueId += characters[randomIndex];
  }

  // Combine timestamp and random component

  return uniqueId + timestamp.toString(36);
};
