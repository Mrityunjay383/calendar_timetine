import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import classes from "./index.module.css";
import { Rnd } from "react-rnd";
import { locateYpos } from "../../Helpers/locateYpos";

const Events = ({
  selectedEventId,
  CurrentEventEle,
  events,
  setEvents,
  setSelectedEventId,
  rows,
}) => {
  //Delete Event Handler
  const handleKeyPress = (e): void => {
    if (e.code === "Delete") {
      if (selectedEventId === "") {
        toast.error("No event is selected");
        return;
      }

      if (events.length === 1) {
        window.sessionStorage.setItem("events", JSON.stringify([]));
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

  const changeEventPos = (xLayer, xOSet, y, id) => {
    const thisEvent = events.find((ev) => ev.id === id);

    thisEvent.pos = {
      x: xLayer - xOSet,
      y: locateYpos(y, rows),
    };

    const newEvents = events.filter((ev) => ev.id !== id);

    setEvents([...newEvents, thisEvent]);
  };

  const [resizeStartWidth, setResizeStartWidth] = useState<number>(0);

  const resizeEvent = (dWidth, id) => {
    const thisEvent = events.find((ev) => ev.id === id);

    thisEvent.width = resizeStartWidth + dWidth;

    const newEvents = events.filter((ev) => ev.id !== id);

    setEvents([...newEvents, thisEvent]);
  };

  return (
    <>
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

      {events.map((event) => {
        return (
          <Rnd
            size={{ width: event.width, height: 65 }}
            position={{ x: event.pos.x, y: event.pos.y }}
            key={event.id}
            id={event.id}
            onResizeStart={() => {
              setResizeStartWidth(event.width);
            }}
            onResize={(e, direction, ref, delta) => {
              resizeEvent(delta.width, event.id);
            }}
            onDragStop={(e) => {
              setSelectedEventId(event.id);

              changeEventPos(e.layerX, e.offsetX, e.layerY, event.id);
            }}
          >
            <div
              style={{
                opacity: `${selectedEventId === event.id ? 1 : 0.7}`,
              }}
              className={classes.event}
            >
              <div
                style={{ background: event.color, width: `${event.width}px` }}
              >
                Event {event.index}
              </div>
            </div>
          </Rnd>
        );
      })}
    </>
  );
};

export default Events;
