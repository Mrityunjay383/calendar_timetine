import { FC } from "react";
import classes from "./index.module.css";

interface Props {
  Text: string;
  fontSize: number;
  onClick?: () => void;
}

const Btn: FC<Props> = ({ Text, fontSize, onClick }) => {
  return (
    <button
      className={classes.button3d}
      style={{ fontSize: `${fontSize}px` }}
      onClick={onClick}
    >
      {Text}
    </button>
  );
};

export default Btn;
