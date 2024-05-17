import { FC, useEffect, useRef, useState } from "react";
import classes from "./index.module.css";
import { FaPlusSquare } from "react-icons/fa";

interface Props {
  // userName: string;
}

const initResources: string[] = [
  "Resource 1",
  "Resource 2",
  "Resource 3",
  "Resource 4",
  "Resource 5",
];

const ResourceSideBar: FC<Props> = () => {
  const [resources, setResources] = useState<string[]>(initResources);

  //Element of the Resource Column
  const columnRef = useRef<HTMLDivElement | null>(null);

  //Disabling vertical scroll of the component
  useEffect(() => {
    const handleScroll = () => {
      if (columnRef.current) {
        columnRef.current.style.transform = `translateX(${window.scrollX}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={columnRef} className={classes.main}>
      {resources.map((resource, i) => {
        return (
          <div key={i} className={classes.resource}>
            {resource}
          </div>
        );
      })}

      <div className={classes.addBtn}>
        <FaPlusSquare />
      </div>
    </div>
  );
};

export default ResourceSideBar;
