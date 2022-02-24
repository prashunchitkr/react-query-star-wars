import React, { useState } from "react";
import { useQuery } from "react-query";
import Person from "./Person";
import { IResponse } from "./Planets";

export interface IPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: any[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}

const fetchPeople = async (page: number = 1) => {
  const res: IResponse<IPerson> = await fetch(
    `https://swapi.dev/api/people/?page=${page}`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return res;
};

const People = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isSuccess, isPreviousData } = useQuery<
    IResponse<IPerson>
  >(["people", page], () => fetchPeople(page), {
    enabled: page >= 1,
    keepPreviousData: true,
  });

  return (
    <>
      <h2>People</h2>
      {isError && <div>Error Fetching Data</div>}
      {isLoading && <div>Loading Data...</div>}
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
            {data?.results.map((person) => (
              <Person key={person.name} person={person} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default People;
