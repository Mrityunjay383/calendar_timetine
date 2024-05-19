import { FC } from "react";
import classes from "./index.module.css";

interface Props {
  Text: string;
  fontSize: number;
  onClick?: () => void;
  backgroundColor?: string;
}

const Btn: FC<Props> = ({ Text, fontSize, onClick, background }) => {
  return (
    <button
      className={classes.button3d}
      style={{ fontSize: `${fontSize}px`, background: background }}
      onClick={onClick}
    >
      {Text}
    </button>
  );
};

export default Btn;
