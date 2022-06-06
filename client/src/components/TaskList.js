import React, { useState, useEffect } from "react";
import taskService from "../services/task.service";
import Task from "./Task";
import TaskCreate from "./TaskCreate";

const TaskList = ({ project }) => {
  const [tasks, setTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  useEffect(() => {
    taskService.getProjectTasks(project.id).then((data) => {
      setTasks(data.data);
    });
  }, [project.id]);

  useEffect(() => {
    const doneTasks = tasks.filter((task) => task.done);
    const todoTasks = tasks.filter((task) => !task.done);
    setDoneTasks(doneTasks);
    setTodoTasks(todoTasks);
  }, [tasks]);

  const onTaskUpdate = (task) => {
    const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
    setTasks(updatedTasks);
  };

  const onDeleteTask = (task) => {
    const updatedTasks = tasks.filter((t) => {
      return t.id !== task.id;
    });
    setTasks(updatedTasks);
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="container" key={project.id}>
      {tasks.length > 0 && (
        <div className="card m-1 p-0 border-2" border="dark" >
          <div className="list-group list-group-flush" style={{backgroundColor:"#ffffcc"}}>
            <h5 className="m-2 bold">TO DO:</h5>
            {todoTasks.map((task) => {
              return (
                <li className="list-group-item" key={task.id} style={{backgroundColor:"#ffffcc"}}>
                  <Task
                    element={task}
                    onDelete={onDeleteTask}
                    onChange={onTaskUpdate}
                  ></Task>
                </li>
              );
            })}
          </div>

          <div className="list-group list-group-flush" style={{backgroundColor:"#ddffcc"}}>
            <h5 className="m-2">{doneTasks ? "DONE:" : ""}</h5>
            {doneTasks.map((task) => {
              return (
                <li className="list-group-item" key={task.id} style={{backgroundColor:"#ddffcc"}}>
                  <Task element={task}></Task>
                </li>
              );
            })}
          </div>
        </div>
      )}
      <TaskCreate onCreate={addTask} project={project}></TaskCreate>
    </div>
  );
};
export default TaskList;
