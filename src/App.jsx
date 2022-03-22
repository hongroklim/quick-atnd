import { Routes, Route } from "react-router-dom";

import ClassList from "./components/ClassList"
import AtndLayout from "./components/AtndLayout"
import Log from "./components/Log"

function App() {
  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="" element={<ClassList />} />
        <Route path="/class" element={<AtndLayout />} />
        <Route path="/log" element={<Log />} />
      </Routes>
    </div>
  );
}

export default App;
