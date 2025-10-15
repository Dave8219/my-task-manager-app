import { useState, useEffect } from "react";
import "../tasks.css";

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

    if (
      !formData.name.trim() ||
      !formData.task.trim() ||
      !formData.progress.trim()
    ) {
      alert("Please fill out all fields before adding a person.");
      return; // Stop the function here — don't add anything
    }

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

export default AddPeople;
