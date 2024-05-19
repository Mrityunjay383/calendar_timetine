import React, { FC, useEffect, useRef, useState } from "react";

import classes from "./index.module.css";
import { locateYpos } from "../../Helpers/locateYpos";
import { generateUniqueColor } from "../../Helpers/genUniqueColor";

interface Props {
  rowsColumnCount: { rows: number; columns: number };
}

interface position {
  x: number;
  y: number;
}

interface event {
  pos: position;
  width: number;
  color: string;
}

const EventsTable: FC<Props> = ({ rowsColumnCount }) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [CurrentEventEle, setCurrentEventEle] = useState<event>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const newEvent: event = {
      pos: {
        x: e.pageX - 150,
        y: locateYpos(e.pageY - 80),
      },
      width: 2,
      color: generateUniqueColor(),
    };

    setCurrentEventEle(newEvent);
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (isDragging) {
      setCurrentEventEle((curr) => {
        return { ...curr, width: e.pageX - 150 - curr.pos.x };
      });
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    setIsDragging(false);

    const newEventELe: event = CurrentEventEle;

    newEventELe.width = e.pageX - 150 - CurrentEventEle.pos.x;

    setEvents((curr) => {
      return [...curr, newEventELe];
    });

    setCurrentEventEle(null);
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

      {CurrentEventEle && (
        <div
          className={classes.event}
          style={{
            left: `${CurrentEventEle.pos.x}px`,
            top: `${CurrentEventEle.pos.y}px`,
            width: `${CurrentEventEle.width}px`,
            background: CurrentEventEle.color,
          }}
        >
          Event {"7"}
        </div>
      )}

      {events.map(({ pos, width, color }, i) => {
        return (
          <div
            key={i}
            className={classes.event}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              width: `${width}px`,
              background: color,
            }}
          >
            Event {"7"}
          </div>
        );
      })}
    </div>
  );
};

export default EventsTable;
