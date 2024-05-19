import classes from "./index.module.css";
import React, { FC, useState } from "react";
import TopMonthBar from "../../Components/TopMonthBar";
import TopDateBar from "../../Components/TopDateBar";
import ResourceSideBar from "../../Components/ResourceSideBar";
import EventsTable from "../../Components/EventsTable";

interface rowsColumn {
  rows: number;
  columns: number;
}

const Calender: FC = () => {
  const [rowsColumnCount, setRowsColumnCount] = useState<rowsColumn>({
    rows: 0,
    columns: 0,
  });

  return (
    <div className={classes.main}>
      <TopMonthBar />

      <div className={classes.tableCom}>
        <div className={classes.firstColumn}></div>
        <TopDateBar setRowsColumnCount={setRowsColumnCount} />
        <ResourceSideBar setRowsColumnCount={setRowsColumnCount} />
        <EventsTable rowsColumnCount={rowsColumnCount} />
      </div>
    </div>
  );
};

export default Calender;
