import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './tasklist.module.css'

const TaskList = ({ tasks, onDeleteTask, onTaskStatusChange }) => {
  return (
    <div className={classes.container}>
    <ul className={classes.task}>
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            <h3><span>Title: </span> {task.title}</h3>
            <p><span>Description:</span> {task.description}</p>
            <button onClick={() => onTaskStatusChange(task.id, !task.completed)}>
              {task.completed ? 'Incomplete' : 'Complete'}
            </button>
            <button onClick={() => onDeleteTask(task.id)}>Delete</button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
    </div>
  );
};

export default TaskList;
