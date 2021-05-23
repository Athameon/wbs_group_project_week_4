import Task from './Task';

class Storage {
  static restoreTasks = () => {
    // let data = window.localStorage.getItem('tasks');
    const serializedTasksJsonObjects = '[{"_title":"Clean car","_status":"todo","_position":8,"_id":"ad260040e-249a-4e8f-aae5-d11ac25dc40d"},{"_title":"Build houise","_status":"todo","_position":9,"_id":"a7e077e8c-5b1e-4e70-9c6a-da99f118b13b"}]';
    console.log("Called method restoreTasks. Following tasks are persisted: " , serializedTasksJsonObjects);
    let taskJsonObjects = JSON.parse(serializedTasksJsonObjects);
    console.log("Following stored tasks get restored:", taskJsonObjects);
  
    // taskJsonObjects.sort((a, b) => a._position - b._position)
    //   .forEach(task => {
    //     // restoreTask(task);
    //   });
    const taskList = [];
    taskJsonObjects.forEach(jsonTask => {
        taskList.push(Object.assign(new Task, jsonTask));
      });
    // console.log("New object: " , taskList[0].title);
    return taskList;
  }
  
  // function restoreTask(task) {
  //   console.log("Called method restoreTask");
  //   let taskElement;
  //   switch(task._status) {
  //     case 'todo':
  //       taskElement = getTaskTemplate("todo", task._title, task._id, task._position);
  //       toDoList.insertAdjacentHTML("beforeend", taskElement);
  //       break;
  //     case 'inProgress':
  //       taskElement = getTaskTemplate("inProgress", task._title, task._id, task._position);
  //       inProgressList.insertAdjacentHTML("beforeend", taskElement);
  //       break;
  //     case 'done':
  //       taskElement = getTaskTemplate("done", task._title, task._id, task._position);
  //       doneList.insertAdjacentHTML("beforeend", taskElement);
  //       break;
  //     default:
  //       console.error("Failed to restore folloing task: " + JSON.stringify(task));
  //       alert('Invalid stored status in: ' + JSON.stringify(task));
  //       return;
  //   }
  // }
    
//   static storeTask(task) {
//       console.log("Called method 'storeTask");
//       let data = window.localStorage.getItem('tasks');
//       data = JSON.parse(data);
//       if(data===null) {
//         data = [];
//       }
//       const filteredTasks = data.filter(currentTask => currentTask.id === task.id);
//       if(filteredTasks.length > 0) {  // update
//         console.log("Update task with id: " + task.id);
//         filteredTasks[0] = task;
//       } else {  // insert
//         console.log("Insert task with id: " + task.id);
//         data.push(task);
//       }
//       const items_json = JSON.stringify(data);
//       console.log("New persisted array: ", items_json);
  
//       window.localStorage.setItem('tasks', items_json);
//   }
  
//   static deleteTaskFromLocalStorage(taskIdToBeDeleted) {
//     console.log('Delete task from local storage with id: ' , taskIdToBeDeleted);
//     const serializedStoredTasks = window.localStorage.getItem('tasks');
//     const storedTasks = JSON.parse(serializedStoredTasks);
//     const taskListAfterLelete = this.removeItemFromArray(storedTasks, taskIdToBeDeleted);
  
//     const items_json = JSON.stringify(taskListAfterLelete);
//     console.log("Persisted tasks after delete: ", items_json);
  
//     window.localStorage.setItem('tasks', items_json);
//   }
  
//   static removeItemFromArray(arr, taskIdToBeDeleted) {
//     const index = arr.findIndex(task => {
//       return task._id === taskIdToBeDeleted
//     });
//     if (index > -1) {
//       arr.splice(index, 1);
//     } else {
//       console.log(`Error: Could not find the task with the id ${taskIdToBeDeleted}.`)
//     }
//     return arr;
//   }
  
//   static updateTaskTitle(id, title) {
//     console.log(`Update task title of task with id ${id} to ${title}`);
//     let serializedStoredTasks = window.localStorage.getItem('tasks');
//     const storedTasks = JSON.parse(serializedStoredTasks);
//     let task = storedTasks.find(currentTask => currentTask._id === id);
//     task._title = title;
//     const items_json = JSON.stringify(storedTasks);
//     console.log("New persisted array: ", items_json);
  
//     window.localStorage.setItem('tasks', items_json);
//   }
  
//   static updateTaskInLocalStorage(task) {
//       let serializedStoredTasks = window.localStorage.getItem('tasks');
//       const storedTasks = JSON.parse(serializedStoredTasks);
//       let index = storedTasks.findIndex(currentTask => currentTask._id === task.id);
//       storedTasks[index] = task;
//       const items_json = JSON.stringify(storedTasks);
//       console.log("New persisted array: ", items_json);
    
//       window.localStorage.setItem('tasks', items_json);
//     }
}

export default Storage;