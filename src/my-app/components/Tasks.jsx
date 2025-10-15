import React, { useState, useEffect } from "react";
import { names } from "../names.js";
import "../tasks.css";
import LogoutLink from "./LogoutLink.jsx";

// this belonged in the RenderTasks Component with a hard coded setup
// <AddPeople people={people} setPeople={setPeople} />;

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

export default Tasks;
