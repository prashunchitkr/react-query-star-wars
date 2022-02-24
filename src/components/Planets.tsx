import React from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

export interface IResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface IPlanet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}

const Planets = () => {
  const fetchPlanets = async () => {
    const res: IResponse<IPlanet> = await fetch(
      "https://swapi.dev/api/planets/"
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));

    return res;
  };

  const { data, status } = useQuery<IResponse<IPlanet>>(
    "planets",
    fetchPlanets,
    {
      staleTime: 0,
      cacheTime: 1000 * 60,
    }
  );

  return (
    <>
      <h2>Planets</h2>
      {status === "error" && <div>Error Fetching Data</div>}
      {status === "loading" && <div>Loading Data...</div>}
      {status === "success" && (
        <div>
          {data?.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </>
  );
};

export default Planets;
