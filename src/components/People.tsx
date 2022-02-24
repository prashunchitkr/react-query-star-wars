import React from "react";
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

const People = () => {
  const fetchPeople = async () => {
    const res: IResponse<IPerson> = await fetch("https://swapi.dev/api/people/")
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return res;
  };

  const { data, status } = useQuery<IResponse<IPerson>>("people", fetchPeople);

  return (
    <>
      <h2>People</h2>
      {status === "error" && <div>Error Fetching Data</div>}
      {status === "loading" && <div>Loading Data...</div>}
      {status === "success" && (
        <div>
          {data?.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </>
  );
};

export default People;
