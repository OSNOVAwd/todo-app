import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../firebase';

const Dashboard = () => {
  const [newTask, setNewTask] = useState('');
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksSnapshot = await firestore.collection('tasks').get();
      const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      dispatch({ type: 'SET_TASKS', tasks });
    };

    fetchTasks();
  }, [dispatch]);

  const handleAddTask = async () => {
    const task = { title: newTask, completed: false };
    const docRef = await firestore.collection('tasks').add(task);
    dispatch({ type: 'ADD_TASK', task: { id: docRef.id, ...task } });
    setNewTask('');
  };

  const handleToggleTask = async (id, completed) => {
    await firestore.collection('tasks').doc(id).update({ completed: !completed });
    dispatch({ type: 'UPDATE_TASK', task: { id, completed: !completed } });
  };

  const handleDeleteTask = async (id) => {
    await firestore.collection('tasks').doc(id).delete();
    dispatch({ type: 'DELETE_TASK', taskId: id });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New Task" />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</span>
            <button onClick={() => handleToggleTask(task.id, task.completed)}>{task.completed ? 'Undo' : 'Complete'}</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
