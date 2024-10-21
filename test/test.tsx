'use client'

import styles from './test.module.css';
import React, { useState } from 'react';

export default function Test(): JSX.Element {
  // Your Test Starts Here

  //REACT HOOKS
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState<{ id: number; text: string; done: boolean }[]>([]);
  const [taskId, setTaskId] = useState<number>(0)
  const [isEditing, setIsEditing] = useState<{ id: number | null; newText: string | null }>({
    id: null,
    newText: null,
  });
  const [errorInput, setErrorInput] = useState(false);


  //FUNCTIONS
  //This function adds a new task to the list
  const handleAddTask = () => {
    if (text === '') {
      setErrorInput(true);
    } else {
      setTaskId((prevId) => prevId + 1)
      setTasks([...tasks, { id: taskId, text, done: false }]);
      setText('');
      setErrorInput(false);
    }
  };

  //This function sets the properties of isEditing to the task that is being edited, when you press the edit button
  const startEditing = (id: number, currentText: string) => {
    setIsEditing({ id, newText: currentText });
  };

  const handleChangeTask = (updatedTask: { id: number; text: string; done: boolean }) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  //This function updates the properties of the task that is being edited, when you press the save button
  const handleEditTask = () => {
    if (isEditing.id !== null && isEditing.newText !== null) {
      handleChangeTask({
        ...tasks.find((task) => task.id === isEditing.id)!,
        text: isEditing.newText,
      });
      setIsEditing({ id: null, newText: null });
    }
  };

  //This function deletes a task from the list
  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  //RENDER
  return (
    <div className={styles.mainContainer}>

      {/* Task input */}
      <div className={styles.container}>
        <div className={styles.input}>
          <h1>To do list</h1>
          <div>
            <input placeholder="Add task" value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={handleAddTask}>Add</button>
          </div>
        </div>

        {/* Condicional render when there is an error */}
        {errorInput && <h4>Please insert a valid input</h4>}

        {/* Task list */}
        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.task}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={(e) => handleChangeTask({ ...task, done: e.target.checked })}
              />

              {/* Condicional render when editing */}
              {isEditing.id === task.id ? (
                <>
                  <input
                    className={styles.editingTaskInput}
                    value={isEditing.newText ?? task.text}
                    onChange={(e) => setIsEditing({ ...isEditing, newText: e.target.value })}
                  />
                  <button onClick={handleEditTask} className={styles.lateralMargin}>
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing({ id: null, newText: null })} 
                    className={styles.lateralMargin}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className={styles.taskText}>{task.text}</span>
                  <button
                    onClick={() => startEditing(task.id, task.text)}
                    className={styles.lateralMargin}
                  >
                    Edit
                  </button>
                </>
              )}
              <button onClick={() => handleDeleteTask(task.id)} className={styles.lateralMargin}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}