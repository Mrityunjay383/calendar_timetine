import Calender from "./Pages/Calender";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Calender />
    </div>
  );
};

export default App;
