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
            // className={classes.event}
            size={{ width: event.width, height: 65 }}
            position={{ x: event.pos.x, y: event.pos.y }}
            key={event.id}
            id={event.id}
            onResize={(e, direction, ref, delta, position) => {
              // console.log(`#2024140215414402 delta`, delta);
              // const thisEvent = events.find((ev) => ev.id === event.id);
              //
              // thisEvent.width += delta.width;
              //
              // const newEvents = events.filter((ev) => ev.id === event.id);
              //
              // setEvents([...newEvents, thisEvent]);
            }}
            onDragStop={(e) => {
              console.log(`#2024140221540611 e`, e);
              changeEventPos(e.layerX, e.offsetX, e.layerY, event.id);
            }}
            onClick={() => {
              setSelectedEventId(event.id);
            }}
          >
            <div
              style={{
                // left: `${pos.x}px`,
                // top: `${pos.y}px`,
                opacity: `${selectedEventId === event.id ? 1 : 0.7}`,
              }}
              className={classes.event}
              // onDrop={(e) => console.log(`#20241402122457 e Drop`, e)}
              // onDragOver={(e) => console.log(`#202414021029162 e over`, e)}
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
