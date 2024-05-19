import React, { FC, useEffect, useState } from "react";

import classes from "./index.module.css";
import { locateYpos } from "../../Helpers/locateYpos";
import { generateUniqueColor, generateUniqueId } from "../../Helpers/genUnique";
import Events from "../Events";

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
  id: string;
  index: number;
}

const EventsTable: FC<Props> = ({ rowsColumnCount }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const [CurrentEventEle, setCurrentEventEle] = useState<event>(null);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [events, setEvents] = useState([]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const isAlreadyAnEventExist =
      e.target.parentElement.className.includes("event") ||
      e.target.className.includes("event");

    if (!isAlreadyAnEventExist) {
      setSelectedEventId("");

      setIsDragging(true);

      const newEvent: event = {
        pos: {
          x: e.pageX - 150,
          y: locateYpos(e.pageY - 80, rowsColumnCount.rows),
        },
        width: 2,
        color: generateUniqueColor(),
        id: generateUniqueId(),
        index: events.length + 1,
      };

      setCurrentEventEle(newEvent);
    }
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (isDragging) {
      setCurrentEventEle((curr) => {
        return { ...curr, width: e.pageX - 150 - curr.pos.x };
      });
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (isDragging) {
      setIsDragging(false);

      const newEventELe: event = CurrentEventEle;

      newEventELe.width = e.pageX - 150 - CurrentEventEle.pos.x;

      setEvents((curr) => {
        return [...curr, newEventELe];
      });

      setCurrentEventEle(null);
    }

    console.log(`#2024140221643224 e.pageX`, e.pageX);
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

  return (
    <div className={classes.main} onMouseDown={handleMouseDown}>
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

      <Events
        selectedEventId={selectedEventId}
        CurrentEventEle={CurrentEventEle}
        events={events}
        setEvents={setEvents}
        setSelectedEventId={setSelectedEventId}
        rows={rowsColumnCount.rows}
      />
    </div>
  );
};

export default EventsTable;
