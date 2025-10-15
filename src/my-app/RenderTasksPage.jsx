import React, { useState, useEffect } from "react";
import { names } from "./names.js";
import Tasks from "./components/Tasks.jsx";
import "./styles/tasks.css";
import LogoutLink from "./components/LogoutLink.jsx";
import GridContainerHeading from "./components/GridContainerHeading.jsx";
import CustomerInfo from "./components/CustomerInfo.jsx";
import AddPeople from "./components/AddPeople.jsx";

const RenderTasks = () => {
  // const [people, setPeople] = useState(names);
  const [people, setPeople] = useState(() => {
    const saved = localStorage.getItem("people");
    return saved ? JSON.parse(saved) : names;
  });

  useEffect(() => {
    if (people.length === 0) {
      localStorage.setItem("people", JSON.stringify(names));
      setPeople(names);
    } else {
      localStorage.setItem("people", JSON.stringify(people));
    }
  }, [people]);

  const addPerson = (newPerson) => {
    setPeople([...people, newPerson]);
  };

  const deletePerson = (id) => {
    setPeople(people.filter((person) => person.id !== id));
  };

  const editPerson = (updatedPerson) => {
    setPeople(
      people.map((person) =>
        person.id === updatedPerson.id ? { ...updatedPerson } : person
      )
    );
  };

  return (
    <>
      <main>
        <LogoutLink />
        <CustomerInfo />
        <GridContainerHeading />
        <Tasks people={people} onDelete={deletePerson} onEdit={editPerson} />
        <AddPeople onAdd={addPerson} />
      </main>
    </>
  );
};

export default RenderTasks;
