import { FC } from "react";

import classes from "./index.module.css";

interface Props {
  rowsColumnCount: { rows: number; columns: number };
}

const EventsTable: FC<Props> = ({ rowsColumnCount }) => {
  return (
    <div className={classes.main}>
      {Array(rowsColumnCount.rows)
        .fill(1)
        .map((row, i) => {
          return (
            <div key={i} className={classes.row}>
              {Array(rowsColumnCount.columns)
                .fill(1)
                .map((column, i) => {
                  return (
                    <div
                      key={i}
                      className={classes.column}
                      style={{ width: `${rowsColumnCount.columns * 5}vh` }}
                    ></div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

export default EventsTable;
