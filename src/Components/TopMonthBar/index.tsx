import { FC, useEffect, useState } from "react";
import classes from "./index.module.css";
import { getCurrentMonthAndYear } from "../../Helpers/date";

interface Props {
  // userName: string;
}

const TopMonthBar: FC<Props> = ({}) => {
  const [currentMonth, setCurrentMonth] = useState<string>("");
  const [currentYear, setCurrentYear] = useState<number>(2024);

  useEffect(() => {
    const { currentMonth, currentYear } = getCurrentMonthAndYear();

    setCurrentMonth(currentMonth);
    setCurrentYear(currentYear);
  }, []);

  return (
    <div className={classes.main}>
      <div>
        {currentMonth} {currentYear}
      </div>
      <div> {`< Today >`} </div>
    </div>
  );
};

export default TopMonthBar;
