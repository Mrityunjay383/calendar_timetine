import { FC, useEffect, useRef } from "react";
import classes from "./index.module.css";
import { IoMdAddCircle } from "react-icons/io";

interface Props {
  // userName: string;
}

const resources: string[] = [
  "Resource 1",
  "Resource 2",
  "Resource 3",
  "Resource 4",
  "Resource 5",
];

const ResourceSideBar: FC<Props> = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  //Disabling vertical scroll of the component
  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        elementRef.current.style.transform = `translateX(${window.scrollX}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={elementRef} className={classes.main}>
      {resources.map((resource, i) => {
        return (
          <div key={i} className={classes.resource}>
            {resource}
          </div>
        );
      })}

      <div className={classes.resource}>
        <IoMdAddCircle />
      </div>
    </div>
  );
};

export default ResourceSideBar;
