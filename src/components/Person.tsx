import React, { VFC } from "react";
import { IPerson } from "./People";

interface IPersonProps {
  person: IPerson;
}

const Person: VFC<IPersonProps> = ({ person }) => {
  return (
    <div className="card">
      <h3>{person.name}</h3>
      <p>Gender: {person.gender}</p>
      <p>Birth Year: {person.birth_year}</p>
    </div>
  );
};

export default Person;
