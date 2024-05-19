export const generateUniqueColor = (): string => {
  // Generate a random number between 0 and 16777215 (hexadecimal range for colors)
  const randomColor: string = Math.floor(Math.random() * 16777215).toString(16);

  console.log(`#2024140182220172 #${randomColor.padStart(6, "0")}`);

  // Ensure the color code is 6 characters long by padding with leading zeros if necessary
  return `#${randomColor.padStart(6, "0")}`;
};
