let tasks = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Retrieve tasks for the current group
    const { groupId } = req.query;
    const groupTasks = tasks.filter((task) => task.groupId === groupId);
    res.status(200).json(groupTasks);
  } else if (req.method === 'POST') {
    // Add a new task for the current user's group
    const { groupId, title, description } = req.body;
    const newTask = {
      id: Date.now(),
      groupId,
      title,
      description,
      completed: false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else if (req.method === 'PUT') {
    // Update task status (complete/incomplete)
    const { taskId, completed } = req.body;
    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed } : task
    );
    res.status(200).json({ message: 'Task status updated successfully' });
  } else if (req.method === 'DELETE') {
    // Delete a task
    const { taskId } = req.query;
    tasks = tasks.filter((task) => task.id !== Number(taskId));
    res.status(200).json({ message: 'Task deleted successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
