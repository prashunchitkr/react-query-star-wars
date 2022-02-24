import { useState } from "react";
import Navbar from "./components/Navbar";
import People from "./components/People";
import Planets from "./components/Planets";

export enum Pages {
  people = "peopls",
  planets = "planets",
}

function App() {
  const [page, setPage] = useState<Pages>(Pages.planets);

  return (
    <div className="App">
      <h1>Star Wars Info</h1>
      <Navbar setPage={setPage} />
      <div className="content">
        {page === Pages.planets ? <Planets /> : <People />}
      </div>
    </div>
  );
}

export default App;
