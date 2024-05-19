export const locateYpos = (ypos: number): number => {
  const heightOfRow: number = 65;

  const heightMultiple = Math.floor(ypos / heightOfRow);

  return heightMultiple * heightOfRow;
};
