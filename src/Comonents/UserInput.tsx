// import React, { useState, useEffect } from "react";

// interface Task {
//   task: string;
//   priority: number;
// }

// const UserInput: React.FC = () => {
//   const [taskInput, setTaskInput] = useState<string>("");
//   const [taskPriority, setTaskPriority] = useState<string>("");
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const [tasks, setTasks] = useState<Task[]>([]);

//   useEffect(() => {
//     const savedTasks = localStorage.getItem("tasks");
//     if (savedTasks) {
//       setTasks(JSON.parse(savedTasks));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTaskInput(e.target.value);
//   };

//   const handleTaskPriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTaskPriority(e.target.value);
//   };

//   const handleAddTask = () => {
//     setTaskInput("");
//     setTaskPriority("");
//     setErrorMessage("");

//     if (
//       taskInput.trim() === "" ||
//       taskPriority.trim() === "" ||
//       isNaN(Number(taskPriority))
//     ) {
//       setErrorMessage(
//         "Please make sure you entered proper details in both fields."
//       );
//       return;
//     }

//     // Adding task
//     const newPriority = parseInt(taskPriority);
//     const newTask: Task = {
//       task: taskInput,
//       priority: newPriority,
//     };

//     let updatedTasks = [...tasks];
//     const existingTask = tasks.find((task) => task.priority === newPriority);
//     if (existingTask) {
//       updatedTasks = updatedTasks.map((task) => {
//         if (task.priority >= newPriority) {
//           task.priority++;
//         }
//         return task;
//       });
//     }

//     // For the Rearangment of task
//     updatedTasks.push(newTask);
//     updatedTasks.sort((a, b) => a.priority - b.priority);
//     setTasks(updatedTasks);
//   };

//   //   Handle delete
//   const handleDeleteTask = (index: number) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this task?"
//     );
//     if (confirmed) {
//       const updatedTasks = tasks.filter((_, i) => i !== index);
//       updatedTasks.forEach((task, i) => {
//         task.priority = i + 1;
//       });
//       setTasks(updatedTasks);
//     }
//   };

//   // Handle update
//   const handleEditTask = (index: number) => {
//     const newTask = prompt("Edit task:", tasks[index].task);
//     if (newTask !== null) {
//       const newPriorityInput = prompt(
//         "Enter new priority for the task:",
//         tasks[index].priority.toString()
//       );
//       if (newPriorityInput !== null) {
//         const newPriority = parseInt(newPriorityInput);
//         if (!isNaN(newPriority) && newPriority >= 1) {
//           const oldPriority = tasks[index].priority;
//           const updatedTasks = tasks.map((task, i) => {
//             if (i === index) {
//               return {
//                 ...task,
//                 task: newTask,
//                 priority: newPriority,
//               };
//             } else if (task.priority === newPriority) {
//               return {
//                 ...task,
//                 priority: oldPriority,
//               };
//             }
//             return task;
//           });
//           updatedTasks.sort((a, b) => a.priority - b.priority);
//           setTasks(updatedTasks);
//         } else {
//           alert("Please enter a valid priority (a positive integer).");
//         }
//       }
//     }
//   };

//   return (
//     <>
//       <div className="mx-auto py-5">
//         <div className="flex flex-col md:flex-row items-center justify-center md:items-start space-y-4 md:space-y-0 md:space-x-4 my-3">
//           <input
//             id="taskPriority"
//             type="number"
//             className="border rounded px-4 py-2 w-full md:w-auto"
//             placeholder="Enter task priority..."
//             value={taskPriority}
//             onChange={handleTaskPriorityChange}
//           />
//           <input
//             id="taskInput"
//             type="text"
//             className="border rounded px-4 py-2 w-full md:w-auto"
//             placeholder="Enter task..."
//             value={taskInput}
//             onChange={handleTaskInputChange}
//           />
//           <button
//             id="addTaskBtn"
//             className="bg-gray-500 text-white px-4 py-2 rounded"
//             onClick={handleAddTask}
//           >
//             Add Task
//           </button>
//         </div>
//         <br />
//         <p
//           id="errorMessage"
//           className="text-sm text-red-500  text-center md:block"
//         >
//           {errorMessage}
//         </p>
//       </div>

//       <div id="todoList" className="mx-auto py-5">
//         {tasks.map((task, index) => (
//           <div
//             key={index}
//             className="flex items-center border border-2 justify-between max-w-screen-lg my-3 mx-auto rounded-lg px-4 py-2 shadow-md md:shadow-2xl"
//           >
//             <div className="flex flex-col md:flex-row md:items-center item-left  w-full">
//               <div className="md:mr-auto mb-2 md:mb-0 md:pr-4 max-w-full">
//                 <div className="my-2">
//                   <span className="font-bold">Task -</span> {task.priority}
//                 </div>
//                 <div className="whitespace-normal break-all">
//                   <span className="font-bold">Description -</span> {task.task}
//                 </div>
//               </div>
//               <div className="flex justify-center md:justify-end">
//                 <button
//                   className="text-blue-500 text-sm mr-2 bg-green-200 rounded p-2"
//                   onClick={() => handleEditTask(index)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="text-red-500 bg-red-200 text-sm rounded p-2"
//                   onClick={() => handleDeleteTask(index)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default UserInput;

import React, { useState, useEffect } from "react";

interface Task {
  task: string;
  priority: number;
}

const UserInput: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [taskText, setTaskText] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const renderTasks = () => {
    return tasks.map((task, index) => (
      <div
        key={index}
        className="flex items-center justify-between bg-white rounded-lg px-4 py-2 shadow-md md:shadow-2xl"
      >
        <div className="flex flex-col md:flex-row items-center w-full">
          <div className="md:mr-auto mb-2 md:mb-0 md:pr-4">
            <div className="my-2">
              <span className="font-bold">Task -</span> {task.priority}
            </div>
            <div>
              <span className="font-bold">Description -</span> {task.task}
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <button
              className="text-blue-500 mr-2 bg-green-200 rounded p-3"
              onClick={() => editTask(index)}
            >
              Edit
            </button>
            <button
              className="text-red-500 bg-red-200 rounded p-3"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ));
  };

  const addTask = (taskText: string, priority: number) => {
    let newTasks = [...tasks];
    const existingIndex = newTasks.findIndex((t) => t.priority === priority);

    if (existingIndex !== -1) {
      newTasks = newTasks.map((t) => {
        if (t.priority >= priority) {
          t.priority++;
        }
        return t;
      });
    }

    newTasks.push({ task: taskText, priority });
    newTasks.sort((a, b) => a.priority - b.priority);
    setTasks(newTasks);
  };

  const editTask = (index: number) => {
    const newTask = prompt("Edit task:", tasks[index].task);
    if (newTask !== null) {
      const newPriority = parseInt(
        prompt(
          "Enter new priority for the task:",
          tasks[index].priority.toString()
        ) || ""
      );
      if (!isNaN(newPriority) && newPriority >= 1) {
        const newTasks = [...tasks];
        const oldPriority = newTasks[index].priority;
        newTasks[index].task = newTask;
        if (newPriority !== oldPriority) {
          const existingIndex = newTasks.findIndex(
            (task) => task.priority === newPriority
          );
          if (existingIndex !== -1) {
            newTasks.forEach((task) => {
              if (task.priority >= newPriority && task !== newTasks[index]) {
                task.priority++;
              }
            });
          }
          newTasks[index].priority = newPriority;
          newTasks.sort((a, b) => a.priority - b.priority);
          newTasks.forEach((task, i) => {
            task.priority = i + 1;
          });
          setTasks(newTasks);
        }
      } else {
        alert("Please enter a valid priority (a positive integer).");
      }
    }
  };

  const deleteTask = (index: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const newTasks = tasks.filter((_, i) => i !== index);
      newTasks.forEach((task, i) => {
        task.priority = i + 1;
      });
      setTasks(newTasks);
    }
  };

  const handleAddTask = () => {
    const priority = parseInt(taskPriority);
    if (taskText !== "" && !isNaN(priority) && priority >= 1) {
      addTask(taskText, priority);
      setTaskText("");
      setTaskPriority("");
      setErrorMessage("");
    } else {
      setErrorMessage(
        "Please make sure you entered proper details and priority of your tasks."
      );
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
        Dynamic Todo App
      </h1>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 my-3">
          <input
            id="taskPriority"
            type="number"
            className="border px-4 py-2 w-full md:w-auto"
            min="1"
            placeholder="Enter task priority..."
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
          />
          <input
            id="taskInput"
            type="text"
            className="border px-4 py-2 w-full md:w-auto"
            placeholder="Enter task..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button
            id="addTaskBtn"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
        <div className="flex items-center space-x-4 my-3">
          <p id="errorMessage" className="text-xs text-red-500">
            {errorMessage}
          </p>
        </div>
        <div id="todoList" className="space-y-4">
          {renderTasks()}
        </div>
      </div>
    </div>
  );
};

export default UserInput;
