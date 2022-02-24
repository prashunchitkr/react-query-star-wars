import React, { VFC } from "react";
import { Pages } from "../App";

interface INavbarProps {
  setPage: (page: Pages) => void;
}

const Navbar: VFC<INavbarProps> = ({ setPage }) => {
  return (
    <nav>
      <button onClick={() => setPage(Pages.planets)}>Planets</button>
      <button onClick={() => setPage(Pages.people)}>People</button>
    </nav>
  );
};

export default Navbar;
