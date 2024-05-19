import React, { FC, useEffect, useRef, useState } from "react";

import classes from "./index.module.css";
import { locateYpos } from "../../Helpers/locateYpos";

interface Props {
  rowsColumnCount: { rows: number; columns: number };
}

interface position {
  x: number;
  y: number;
}

const EventsTable: FC<Props> = ({ rowsColumnCount }) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<position>({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState<position>({ x: 0, y: 0 });

  const [CurrentEventEle, setCurrentEventEle] = useState(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartPosition({
      x: e.pageX,
      y: e.pageY,
    });

    const newEvent = {
      pos: {
        x: e.pageX - 150,
        y: locateYpos(e.pageY - 80),
      },
      width: 10,
    };

    setEvents((curr) => {
      return [...curr, newEvent];
    });
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (isDragging) {
      setPosition({
        x: e.pageX,
        y: e.pageY,
      });
    }
  };

  useEffect(() => {
    // addNewEvent(false, position);
  }, [position]);

  const handleMouseUp = () => {
    setIsDragging(false);
    // addNewEvent(true);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const [events, setEvents] = useState([]);

  // const addNewEvent = (end: boolean, pos?: position) => {
  //   console.log(`#2024140171331367 pos`, pos);
  //   console.log(`#2024140171646388 end`, end);
  // };

  return (
    <div className={classes.main} ref={tableRef} onMouseDown={handleMouseDown}>
      {Array(rowsColumnCount.rows)
        .fill(1)
        .map((row, i) => {
          return (
            <div
              key={i}
              className={classes.row}
              style={{ width: `${rowsColumnCount.columns * 80}px` }}
            >
              {Array(rowsColumnCount.columns)
                .fill(1)
                .map((column, i) => {
                  return <div key={i} className={classes.column}></div>;
                })}
            </div>
          );
        })}

      {events.map(({ pos, width }, i) => {
        return (
          <div
            key={i}
            className={classes.event}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              width: `${width}px`,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default EventsTable;
