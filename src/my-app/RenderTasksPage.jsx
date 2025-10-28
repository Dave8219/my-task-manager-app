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
            _id: task._id,
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

  const deletePerson = async (_id) => {
    try {
      if (typeof _id === "string" && _id.length === 24) {
        const token = localStorage.getItem("token");
        console.log("Deleting person with id:", _id);

        await axios.delete(`http://localhost:3000/tasks/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setPeople(people.filter((person) => person._id !== _id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete task. Please try again.");
    }
  };
  /*
  const editPerson = (updatedPerson) => {
    setPeople(
      people.map((person) =>
        person.id === updatedPerson.id ? { ...updatedPerson } : person
      )
    );
  };
*/

  const editPerson = async (updatedPerson) => {
    try {
      const token = localStorage.getItem("token");
      // const id = updatedPerson._id; // use _id for backend
      // Send the updated data to your backend
      const response = await axios.patch(
        `http://localhost:3000/tasks/${updatedPerson._id}`,
        { ...updatedPerson },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedTask = response.data.task || response.data;
      // Update local state with the returned updated task
      console.log("Updated response:", updatedTask);

      setPeople((prevPeople) =>
        prevPeople.map((person) =>
          person._id === updatedPerson._id
            ? { ...person, ...updatedTask }
            : person
        )
      );
    } catch (error) {
      console.error("Error updating person", error);
    }
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
