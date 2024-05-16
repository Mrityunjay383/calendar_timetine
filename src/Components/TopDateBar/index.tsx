import { FC, useEffect, useRef, useState } from "react";
import classes from "./index.module.css";
import { getDaysInCurrentMonth } from "../../Helpers/date";

interface Props {
  // userName: string;
}

const TopDateBar: FC<Props> = () => {
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchedDates: string[] = getDaysInCurrentMonth();

    setDates(fetchedDates);
  }, []);

  const elementRef = useRef<HTMLDivElement>(null);

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
            {date}
          </div>
        );
      })}
    </div>
  );
};

export default TopDateBar;
