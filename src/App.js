import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditEmployee from "./Components/EditEmployee";
import Home from "./Components/Home";
import ViewEmployee from "./Components/ViewEmployee";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route
          exact
          path="/edit/:eid"
          element={<EditEmployee></EditEmployee>}
        ></Route>
        <Route
          element={<ViewEmployee></ViewEmployee>}
          exact
          path="/view/:eid"
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
