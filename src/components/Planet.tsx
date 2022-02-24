import React, { VFC } from "react";
import { IPlanet } from "./Planets";

interface IPlanetProps {
  planet: IPlanet;
}

const Planet: VFC<IPlanetProps> = ({ planet }) => {
  return (
    <div className="card">
      <h3>{planet.name}</h3>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>
      <p>Climate: {planet.climate}</p>
    </div>
  );
};

export default Planet;
