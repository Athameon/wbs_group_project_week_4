import Task from './Task';

class Storage {
  static restoreTasks = () => {
    let serializedTasksJsonObjects = window.localStorage.getItem('tasks');
    // const serializedTasksJsonObjects = '[{"_title":"Clean car","_status":"todo","_position":8,"_id":"ad260040e-249a-4e8f-aae5-d11ac25dc40d"},{"_title":"Build houise","_status":"todo","_position":9,"_id":"a7e077e8c-5b1e-4e70-9c6a-da99f118b13b"}]';
    console.log("Called method restoreTasks. Following tasks are persisted: " , serializedTasksJsonObjects);
    if(serializedTasksJsonObjects === "") {
      return [];
    }
    let taskJsonObjects = JSON.parse(serializedTasksJsonObjects);
    console.log("Following stored tasks get restored:", taskJsonObjects);
    if(taskJsonObjects === null) {
      taskJsonObjects = [];
    }
  
    // taskJsonObjects.sort((a, b) => a._position - b._position)
    //   .forEach(task => {
    //     // restoreTask(task);
    //   });
    const taskList = [];
    taskJsonObjects.forEach(jsonTask => {
      taskList.push(Object.assign(new Task, jsonTask));
    });
    return taskList;
  }
    
  static storeTask(task) {
      console.log("Called method 'storeTask");
      let serializedTasksJsonObjects = window.localStorage.getItem('tasks');
      let taskJsonObjects = [];
      if (serializedTasksJsonObjects !== "") {
        taskJsonObjects = JSON.parse(serializedTasksJsonObjects);
        if(taskJsonObjects===null) {
          taskJsonObjects = [];
        }
      }

      const taskList = [];
      taskJsonObjects.forEach(jsonTask => {
        taskList.push(Object.assign(new Task, jsonTask));
      });

      const filteredTasks = taskList.filter(currentTask => currentTask.id === task.id);
      if(filteredTasks.length > 0) {  // update
        console.log("Update task with id: " + task.id);
        filteredTasks[0] = task;
      } else {  // insert
        console.log("Insert task with id: " + task.id);
        taskJsonObjects.push(task);
      }
      const items_json = JSON.stringify(taskJsonObjects);
      console.log("New persisted array: ", items_json);
  
      window.localStorage.setItem('tasks', items_json);
  }

  static storeAllTasks(tasks) {
    const items_json = JSON.stringify(tasks);
    console.log("New persisted array: ", items_json);

    window.localStorage.setItem('tasks', items_json);
  }
}

export default Storage;