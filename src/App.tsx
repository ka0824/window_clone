import { BrowserRouter, Routes, Route } from "react-router-dom";
import Info from "./page/info/Info";
import Service from "./page/service/Service";

const HOME_PATH = "/";
const SERVICE_PATH = "/service";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={HOME_PATH} element={<Info></Info>}></Route>
          <Route path={SERVICE_PATH} element={<Service></Service>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
