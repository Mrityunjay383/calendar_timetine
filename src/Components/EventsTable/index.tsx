import React, { FC, useEffect, useRef, useState } from "react";

import classes from "./index.module.css";
import { locateYpos } from "../../Helpers/locateYpos";
import { generateUniqueColor, generateUniqueId } from "../../Helpers/genUnique";
import { toast } from "react-toastify";

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
}

const EventsTable: FC<Props> = ({ rowsColumnCount }) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
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
          y: locateYpos(e.pageY - 80),
        },
        width: 2,
        color: generateUniqueColor(),
        id: generateUniqueId(),
      };

      setCurrentEventEle(newEvent);
    } else {
      setSelectedEventId(e.target.parentElement.id);
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

  const handleKeyPress = (e): void => {
    if (e.code === "Delete") {
      console.log(`#2024140195930241 selectedEventId`, selectedEventId);

      if (selectedEventId === "") {
        toast.error("No event is selected");
        return;
      }

      setEvents((curr) => {
        return curr.filter((event) => event.id !== selectedEventId);
      });
    }
  };
  useEffect(() => {
    document.addEventListener("keyup", handleKeyPress);

    return () => {
      document.removeEventListener("keyup", handleKeyPress);
    };
  }, [selectedEventId]);

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
          }}
        >
          <div
            style={{
              background: CurrentEventEle.color,
              width: `${CurrentEventEle.width}px`,
            }}
          >
            Event {events.length + 1}
          </div>
        </div>
      )}

      {events.map(({ pos, width, color, id }, i) => {
        return (
          <div
            key={i}
            className={classes.event}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              opacity: `${selectedEventId === id ? 1 : 0.7}`,
            }}
            id={id}
          >
            <div style={{ background: color, width: `${width}px` }}>
              Event {i + 1}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventsTable;
