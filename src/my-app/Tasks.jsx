import React, { useState, useEffect } from "react";
import { names } from "./names.js";
import "./tasks.css";

// this belonged in the RenderTasks Component with a hard coded setup
// <AddPeople people={people} setPeople={setPeople} />;

const RenderTasks = () => {
  const [people, setPeople] = useState(names);
  const addPerson = (newPerson) => {
    setPeople([...people, newPerson]);
  };
  return (
    <>
      <main>
        <CustomerInfo />
        <GridContainerHeading />
        <Tasks
          people={people}
          onDelete={(id) =>
            setPeople(people.filter((person) => person.id !== id))
          }
        />
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

const Tasks = ({ people, onDelete }) => {
  return (
    <div className="grid-container-box">
      <div className="grid-container">
        {people.map(({ id, name, task, progress }) => {
          // const { id, name, task, progress } = person;

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

          return (
            <React.Fragment key={id}>
              <div className="info-box-1">
                <p className="info-box-p">
                  {name}
                  <button className="delete-btn" onClick={() => onDelete(id)}>
                    Delete
                  </button>
                </p>
              </div>
              <div className="info-box-2">
                <p className="info-box-p">{task}</p>
              </div>
              <div className="info-box-3" style={progressStyle}>
                <p className="info-box-p">{progress}</p>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

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
    <div>
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
        <input
          name="progress"
          type="text"
          value={formData.progress}
          onChange={handleChange}
          placeholder="Enter progress"
        />
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
