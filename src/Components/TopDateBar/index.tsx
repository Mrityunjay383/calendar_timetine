import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./index.module.css";
import {
  getCurrentDayAndWeekday,
  getDaysInCurrentMonth,
} from "../../Helpers/date";

interface Props {
  setRowsColumnCount: Dispatch<SetStateAction<RowsColumns>>;
}

interface RowsColumns {
  rows: number;
  columns: number;
}

const TopDateBar: FC<Props> = ({ setRowsColumnCount }) => {
  const [dates, setDates] = useState<string[]>([]);
  const [currDate, setCurrDate] = useState<string>("");

  const currDateColumnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scroll = () => {
      currDateColumnRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    };

    window.addEventListener("load", scroll);

    const fetchedDates: string[] = getDaysInCurrentMonth();

    //Setting grid column based on the numbers of days in the month
    setRowsColumnCount((curr) => {
      return { ...curr, columns: fetchedDates.length };
    });

    setDates(fetchedDates);

    const currentDate: string = getCurrentDayAndWeekday();

    setCurrDate(currentDate);

    return () => {
      window.removeEventListener("load", scroll);
    };
  }, []);

  const elementRef = useRef<HTMLDivElement | null>(null);

  //Disabling vertical scroll of the component
  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        elementRef.current.style.transform = `translateY(${window.scrollY}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={classes.main} ref={elementRef}>
      {dates.map((date, i) => {
        return (
          <div key={i} className={classes.column}>
            {date === currDate ? (
              <span ref={currDateColumnRef} className={classes.active}>
                {date}
              </span>
            ) : (
              <span>{date}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TopDateBar;
