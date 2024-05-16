import classes from "./index.module.css";
import { FC } from "react";
import TopMonthBar from "../../Components/TopMonthBar";
import TopDateBar from "../../Components/TopDateBar";
import ResourceSideBar from "../../Components/ResourceSideBar";

interface Props {
  // userName: string;
}

const Calender: FC<Props> = ({}) => {
  return (
    <div className={classes.main}>
      <TopMonthBar />

      <div className={classes.tableCom}>
        <div className={classes.firstColumn}></div>
        <TopDateBar />
        <ResourceSideBar />
      </div>
    </div>
  );
};

export default Calender;
