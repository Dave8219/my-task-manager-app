import React, { useState, useEffect } from "react";
// import LogoutLink from "./LogoutLink.jsx";
import ReactRouterLogout from "./ReactRouterLogout.jsx";

import { names } from "./names.js";
import "./tasks.css";

// this belonged in the RenderTasks Component with a hard coded setup
// <AddPeople people={people} setPeople={setPeople} />;

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
        <ReactRouterLogout />
        <CustomerInfo />
        <GridContainerHeading />
        <Tasks people={people} onDelete={deletePerson} onEdit={editPerson} />
        <AddPeople onAdd={addPerson} />
      </main>
    </>
  );
};

const GridContainerHeading = () => {
  return (
    <div className="grid-container-heading">
      <h4>Name</h4>
      <h4>Task</h4>
      <h4>Progress</h4>
    </div>
  );
};

const CustomerInfo = () => {
  return (
    <>
      <div>
        <h1 className="heading">Task Manager App</h1>
      </div>

      <div className="customer-info">
        <div>Worksite: Garcia Home</div>

        <div>Address: 201 E 3rd St, San Juan, TX, 78589</div>
      </div>
    </>
  );
};

const Tasks = ({ people, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null); // id the person to edit
  const [editValues, setEditValues] = useState({
    // useState to start editing values
    name: "",
    task: "",
    progress: "",
  });

  const startEditing = (person) => {
    setEditingId(person.id);
    setEditValues({
      name: person.name,
      task: person.task,
      progress: person.progress,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });
  };

  const saveEdit = (id) => {
    const updatedPerson = { id, ...editValues };
    onEdit(updatedPerson);
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  return (
    <div className="grid-container-box">
      <div className="grid-container">
        {people.map(({ id, name, task, progress }) => {
          // const { id, name, task, progress } = person;
          /*
          let progressStyle = {};
          if (progress === "Done") {
            progressStyle = {
              backgroundColor: "orange",
              color: "black",
            };
          } else if (progress === "In Progress") {
            progressStyle = { backgroundColor: "green", color: "white" };
          } else if (progress === "Delayed") {
            progressStyle = { backgroundColor: "yellow", color: "black" };
          }
*/

          const isEditing = editingId === id; // to set conditional statements

          const currentProgress = isEditing ? editValues.progress : progress;

          const styles = {
            Done: { backgroundColor: "orange", color: "black" },
            "In Progress": { backgroundColor: "green", color: "white" },
            Delayed: { backgroundColor: "yellow", color: "black" },
          };

          const progressStyle = styles[currentProgress] || {};

          return (
            <React.Fragment key={id}>
              <div className="info-box-1">
                {isEditing ? (
                  <input
                    name="name"
                    value={editValues.name}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="info-box-p">{name}</span>
                )}
                {isEditing ? (
                  <>
                    <button onClick={() => saveEdit(id)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => startEditing({ id, name, task, progress })}
                    >
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => onDelete(id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>

              <div className="info-box-2">
                {isEditing ? (
                  <input
                    name="task"
                    value={editValues.task}
                    onChange={handleChange}
                  />
                ) : (
                  <span className="info-box-p">{task}</span>
                )}
              </div>

              <div className="info-box-3" style={progressStyle}>
                {isEditing ? (
                  <select
                    name="progress"
                    value={editValues.progress || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Progress</option>
                    <option value="Done">Done</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Delayed">Delayed</option>
                  </select>
                ) : (
                  <span className="info-box-p">{progress}</span>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

/*
isEditing ? (
                  <input
                    name="progress"
                    value={editValues.progress}
                    onChange={handleChange}
                  />
                )
*/

const AddPeople = ({ onAdd }) => {
  // const [people, setPeople] = useState(names);
  const [formData, setFormData] = useState({
    name: "",
    task: "",
    progress: "",
  });

  /*
  const addPerson = () => {
    const newPerson = {
      id: people.length + 1,
      name: '',
      task: '',
      progress: '',
    };
    setPeople([...people, newPerson]);
  };
*/

  /* people.map((person) => {
        const { id, name, progress, task } = person;
        return (
          <div key={id}>
            <p>{name}</p>
            <p>{task}</p>
            <p>{progress}</p>
          </div>
        );
      })}
*/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      id: Date.now(),
      ...formData,
    };
    onAdd(newPerson);
    setFormData({ name: "", task: "", progress: "" });
  };

  return (
    <div className="add-names-container">
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
        />
        <input
          name="task"
          type="text"
          value={formData.task}
          onChange={handleChange}
          placeholder="Enter task"
        />

        <select name="progress" onChange={handleChange} className="select-btn">
          <option value="">Select Progress</option>
          <option value="Done">Done</option>
          <option value="In Progress">In Progress</option>
          <option value="Delayed">Delayed</option>
        </select>

        <div>
          <button type="submit" className="add-button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

/*
<button onClick={addPerson} className="add-button" type="button">
  Add
</button>;
*/

export default RenderTasks;
