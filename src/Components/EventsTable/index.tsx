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

const defaultEvents = [
  {
    pos: {
      x: 500,
      y: locateYpos(200 - 80),
    },
    width: 180,
    color: generateUniqueColor(),
    id: generateUniqueId(),
    index: 1,
  },
  {
    pos: {
      x: 600,
      y: locateYpos(400 - 80),
    },
    width: 100,
    color: generateUniqueColor(),
    id: generateUniqueId(),
    index: 2,
  },
  {
    pos: {
      x: 1200,
      y: locateYpos(100 - 80),
    },
    width: 150,
    color: generateUniqueColor(),
    id: generateUniqueId(),
    index: 3,
  },

  {
    pos: {
      x: 1800,
      y: locateYpos(300 - 80),
    },
    width: 200,
    color: generateUniqueColor(),
    id: generateUniqueId(),
    index: 3,
  },
];

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

  useEffect(() => {
    const LocalEvents = JSON.parse(window.sessionStorage.getItem("events"));

    if (LocalEvents && LocalEvents.length > 0) {
      setEvents(LocalEvents);
    }
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      window.sessionStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

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
