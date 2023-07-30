import { useState } from "react";
import TaskForm from "@/components/TaskForm/TaskForm";
import TaskList from "@/components/TaskList/TaskList";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./home.module.css";
import Head from "next/head";
import { Fragment } from "react";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [groupId, setGroupId] = useState(null);

  const fetchTasks = async (groupId) => {
    const response = await fetch(`/api/tasks?groupId=${groupId}`);
    const data = await response.json();
    setTasks(data);
  };

  const login = async (username) => {
    // Mock login request to get the group ID
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    setGroupId(data.groupId);
    fetchTasks(data.groupId); // Fetch tasks for the logged-in group

    // Show a success toast notification when a user logs in
    toast.success(`Logged in as ${username}.`);
  };

  const addTask = async (task) => {
    // Add a task for the user's group
    const newTask = {
      ...task,
      groupId,
    };
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    const data = await response.json();
    setTasks([...tasks, data]);
    toast.success("Task added successfully!");
  };

  const deleteTask = async (taskId) => {
    // Delete a task
    await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast.error("Task deleted successfully!");
  };

  const toggleTaskStatus = async (taskId, completed) => {
    // Update task status (complete/incomplete)
    await fetch(`/api/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId, completed }),
    });
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, completed } : task))
    );
    toast.info(`Task marked as ${completed ? "complete" : "incomplete"}.`);
  };

  return (
    <Fragment>
      <Head>
        <title>Task Management System</title>
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={classes.container}
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Task Management System
        </motion.h1>

        <div className={classes.btn}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => login("user-1")}
          >
            Login as User 1
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => login("user-2")}
          >
            Login as User 2
          </motion.button>
        </div>

        <TaskForm onAddTask={addTask} />
        {tasks.length > 0 ? (
          <TaskList
            tasks={tasks}
            onDeleteTask={deleteTask}
            onTaskStatusChange={toggleTaskStatus}
          />
        ) : (
          <p
            style={{
              fontSize: "18px",
              color: "white",
              textAlign: "center",
              margin: "5rem 0",
            }}
          >
            No tasks yet.
          </p>
        )}
        <ToastContainer />
      </motion.div>
    </Fragment>
  );
};

export default HomePage;
