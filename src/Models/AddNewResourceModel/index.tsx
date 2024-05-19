import { FC, useState } from "react";
import Modal from "react-modal";
import { AiFillCloseSquare } from "react-icons/ai";
import Btn from "../../Components/Btn";

import classes from "./index.module.css";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -45%)",
    width: "40vw",
    maxHeight: "80vh",
  },
};

Modal.setAppElement("#root");

interface Props {
  modalIsOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setResources: (string) => void;
}

const AddNewResourceModel: FC<Props> = ({
  modalIsOpen,
  setIsOpen,
  setResources,
}) => {
  const closeModal = (): void => {
    setIsOpen(false);
  };

  const [newResourceName, setNewResourceName] = useState<string>("");

  const addNewResource = (): void => {
    if (newResourceName === "") {
      toast.error("Resource name cannot be empty!");
      return;
    }

    setResources((curr) => [...curr, newResourceName]);
    toast.success("New resource added successfully!");
    setNewResourceName("");
    closeModal();
  };

  const keyPress = (e): void => {
    if (e.key === "Enter") {
      addNewResource();
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className={classes.modelHead}>
        <h2>Add A New Resource</h2>
        <AiFillCloseSquare className={classes.closeIcon} onClick={closeModal} />
      </div>

      <div className={classes.inpFieldCom}>
        <label>Enter the resource name:</label>
        <input
          type={"text"}
          autoFocus={true}
          placeholder={"Type here..."}
          value={newResourceName}
          onKeyDown={keyPress}
          onChange={(e) => setNewResourceName(e.target.value)}
        />
      </div>

      <Btn Text={"Add"} fontSize={13} onClick={addNewResource} />
    </Modal>
  );
};

export default AddNewResourceModel;
