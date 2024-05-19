export const locateYpos = (ypos: number, max): number => {
  const heightOfRow: number = 65;

  const heightMultiple = Math.floor(ypos / heightOfRow);

  let yPos = heightMultiple * heightOfRow;

  if (yPos >= max * heightOfRow) {
    yPos = (max - 1) * heightOfRow;
  }

  return yPos;
};
