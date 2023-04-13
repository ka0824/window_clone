import { BrowserRouter, Routes, Route } from "react-router-dom";
import Info from "./page/info/Info";
import Service from "./page/service/Service";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Info></Info>}></Route>
          <Route path="/service" element={<Service></Service>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
