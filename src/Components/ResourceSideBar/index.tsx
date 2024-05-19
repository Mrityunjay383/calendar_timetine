import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./index.module.css";
import { FaPlusSquare } from "react-icons/fa";
import AddNewResourceModel from "../../Models/AddNewResourceModel";

interface Props {
  setRowsColumnCount: Dispatch<SetStateAction<RowsColumns>>;
}

interface RowsColumns {
  rows: number;
  columns: number;
}

const initResources: string[] = [
  "Resource 1",
  "Resource 2",
  "Resource 3",
  "Resource 4",
  "Resource 5",
];

const ResourceSideBar: FC<Props> = ({ setRowsColumnCount }) => {
  const [resources, setResources] = useState<string[]>([]);

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

  useEffect(() => {
    const LocalResources = JSON.parse(
      window.sessionStorage.getItem("resources")
    );

    if (LocalResources && LocalResources.length > 0) {
      setResources(LocalResources);
    } else {
      setResources(initResources);
    }
  }, []);

  useEffect(() => {
    setRowsColumnCount((curr) => {
      return { ...curr, rows: resources.length };
    });

    if (resources.length > 0) {
      window.sessionStorage.setItem("resources", JSON.stringify(resources));
    }
  }, [resources]);

  //AddNewResourceModel useState
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div ref={columnRef} className={classes.main}>
      <AddNewResourceModel
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        setResources={setResources}
      />

      {resources.map((resource, i) => {
        return (
          <div key={i} className={classes.resource}>
            {resource}
          </div>
        );
      })}

      <div className={classes.addBtn}>
        <FaPlusSquare onClick={() => setIsOpen(true)} />
      </div>
    </div>
  );
};

export default ResourceSideBar;
