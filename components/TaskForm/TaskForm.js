import { useState } from 'react';
import classes from './Task.module.css'

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onAddTask({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className={classes.container}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
