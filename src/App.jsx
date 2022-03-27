import { Routes, Route } from "react-router-dom";

import ClassList from "./components/ClassList"
import AtndLayout from "./components/AtndLayout"
import Export from "./components/Export";
import Log from "./components/Log"

function App() {
  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="" element={<ClassList />} />
        <Route path="/roster/:cid/:pid" element={<AtndLayout />} />
        <Route path="/export" element={<Export />} />
        <Route path="/log" element={<Log />} />
      </Routes>
    </div>
  );
}

export default App;
