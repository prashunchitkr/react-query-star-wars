import React, { useState } from "react";
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

type QueryKey = [string, number];

const fetchPlanets = async (page: number) => {
  const res: IResponse<IPlanet> = await fetch(
    `https://swapi.dev/api/planets/?page=${page}`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return res;
};

const Planets = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isSuccess, isPreviousData } = useQuery<
    IResponse<IPlanet>
  >(["planets", page], () => fetchPlanets(page), {
    enabled: page >= 1,
    keepPreviousData: true,
  });

  return (
    <>
      <h2>Planets</h2>
      {isLoading && <div>Loading Data...</div>}
      {isError && <div>Error Fetching Data</div>}
      {isSuccess && (
        <>
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
            Previous
          </button>
          {page}
          <button
            onClick={() => {
              if (!isPreviousData && data?.next) {
                setPage((p) => p + 1);
              }
            }}
          >
            Next
          </button>

          <div>
            {data?.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Planets;
