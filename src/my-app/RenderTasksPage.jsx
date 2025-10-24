import React, { useState, useEffect } from "react";
import { names } from "./names.js";
import Tasks from "./components/Tasks.jsx";
import "./styles/tasks.css";
import LogoutLink from "./components/LogoutLink.jsx";
import GridContainerHeading from "./components/GridContainerHeading.jsx";
import CustomerInfo from "./components/CustomerInfo.jsx";
import AddPeople from "./components/AddPeople.jsx";
import axios from "axios";

const RenderTasks = () => {
  // const [people, setPeople] = useState(names);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPeople(
          response.data.tasks.map((task) => ({
            id: task._id,
            name: task.name,
            task: task.task,
            progress: task.progress,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch tasks.", error);
      }
    };

    fetchTasks();
  }, []);

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

  const deletePerson = async (id) => {
    try {
      if (typeof id === "string" && id.length === 24) {
        const token = localStorage.getItem("token");
        console.log("Deleting person with id:", id);

        await axios.delete(`http://localhost:3000/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setPeople(people.filter((person) => person.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete task. Please try again.");
    }
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
