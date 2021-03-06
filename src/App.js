import React from 'react';
import './App.css';
import Task from './Task';
import Tasks from './Tasks';
import Arrows from './Arrows';
import Storage from './storage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskInput: "",
      data: Storage.restoreTasks(),
      checkedChecboxes: []
    }
  }
  onNewTaskInput(event) {
    this.setState({ taskInput: event.target.value } );
    console.log(event.target.value);
  }

  deleteTaskCallback = (taskId) => {      
    console.log('Delete task with id: ', taskId);
    const taskListCopy = this.state.data.filter(task => task.id !== taskId)
    this.setState({data: taskListCopy})
    Storage.storeAllTasks(taskListCopy);
  }

  createNewTask(event) {
    console.log("Called createNewTask with inputValue: " + this.state.taskInput);
    if(this.state.taskInput === '') {
      alert('The todo task must be named!');
      return;
    }
    console.log(Tasks);
    const taskListCopy = this.state.data;
    const sortedToDoTaskList = taskListCopy.filter(currentTask => currentTask.status === 'todo').sort((first, second) => second.position - first.position);
    let newTaskPosition = 0;
    if (sortedToDoTaskList.length > 0) {
      newTaskPosition = sortedToDoTaskList[0].position + 1;
    }
    const newTask = new Task({ 
      id: uuidv4(),
      title: this.state.taskInput,
      status: "todo",
      position: newTaskPosition
    })
    taskListCopy.push(newTask)
    this.setState({
      data: taskListCopy
    })
    Storage.storeAllTasks(taskListCopy);
  }

  checkedCheckboxCallback = (taskId, event) => {
    console.log("Checked checkbox for id: " + taskId);
    let checkedCheckboxesCopy = [...this.state.checkedChecboxes];
    if(event.target.checked) {
      checkedCheckboxesCopy.push(taskId);
    } else {
      checkedCheckboxesCopy = checkedCheckboxesCopy.filter(id => id !== taskId);
    }

    this.setState({checkedChecboxes: checkedCheckboxesCopy})
  }

  moveTaskCallback = (forward) => {
    console.log("Clicked next arrow. Checked checkBoxes: " + this.state.checkedChecboxes);
    let markedTasksToMove =[];
    this.state.checkedChecboxes.forEach(checkboxId => {
      markedTasksToMove.push(...this.state.data.filter(task => task.id === checkboxId));
    })
    
    let checkBoxesStayChecked = [];
    let taskListCopy = [...this.state.data];
    markedTasksToMove.forEach(checkedTasks => {
      for(let i = 0; i < taskListCopy.length; i++) {
        const task = taskListCopy[i];
        
        if(task.id === checkedTasks.id) {
          let newTaskStatus = "";
          if (task.status === 'todo') {
            if(forward){
              newTaskStatus = 'inProgress';
            }else{
              newTaskStatus = 'todo';
              checkBoxesStayChecked.push(checkedTasks.id);
            }
          }
          
          if(task.status === 'inProgress') {
            newTaskStatus = forward? 'done' : 'todo';
          }
          
          if (task.status === 'done') {
            if(!forward){
              newTaskStatus = 'inProgress';
            }else{
              newTaskStatus = 'done';
              checkBoxesStayChecked.push(checkedTasks.id);
            }
          }  
          this.setNewTaskPosition(taskListCopy, task, newTaskStatus);
          task.status = newTaskStatus;
        }
      }
    })

    this.setState({
      data: taskListCopy,
      checkedChecboxes: checkBoxesStayChecked
    })
    Storage.storeAllTasks(taskListCopy);
  }
  setNewTaskPosition(taskListCopy, task, newTaskStatus) {
    const sortedTaskList = taskListCopy.filter(currentTask => currentTask.status === newTaskStatus).sort((first, second) => second.position - first.position);
    let newTaskPosition = 0;
    if (sortedTaskList.length > 0) {
      newTaskPosition = sortedTaskList[0].position + 1;
    }
    task.position = newTaskPosition;
  }

  editTaskFinishedCallback = (id, taskTitle) => {
    console.log("Finished editing task with id: ", id);
    const tasksListCopy = [...this.state.data];
    tasksListCopy.forEach(task => {
      if (task.id === id) {
        task.title = taskTitle;
      }
    })
    this.setState({data: tasksListCopy});
    Storage.storeAllTasks(tasksListCopy);
  }

  render() {

    return (
      <div>
        <div className="newItem">
          <input 
            onChange={this.onNewTaskInput.bind(this)}
            onKeyUp={(event) => event.key === 'Enter' && this.createNewTask()} 
            id="newItem" 
            placeholder="New Task" 
            type="text">
          </input>
          <button 
            onClick={this.createNewTask.bind(this)}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <div className="itemList">
          <section className="section" id="todo">
            <h2>ToDo</h2>
            <Tasks 
              taskList={
                this.state.data.filter(task => task.status === "todo").sort((first, second) => first.position - second.position)
              }
              deleteTaskCallback = {this.deleteTaskCallback}
              checkedCheckboxCallback = {this.checkedCheckboxCallback}
              editTaskFinishedCallback = {this.editTaskFinishedCallback}
            />
          </section>
          <section className="arrows">
          <Arrows moveTaskCallback={this.moveTaskCallback} />
          </section>
          <section className="section" id="inProgress">
            <h2>In Progress</h2>
            <Tasks 
              taskList={
                this.state.data.filter(task => task.status === "inProgress").sort((first, second) => first.position - second.position)
              }
              deleteTaskCallback = {this.deleteTaskCallback}
              checkedCheckboxCallback = {this.checkedCheckboxCallback}
              editTaskFinishedCallback = {this.editTaskFinishedCallback}
            />
          </section>
          <section className="arrows">
            <Arrows moveTaskCallback={this.moveTaskCallback} />
          </section>
          <section className="section" id="done">
            <h2>Done</h2>
            <Tasks 
              taskList={
                this.state.data.filter(task => task.status === "done").sort((first, second) => first.position - second.position)
              }
              deleteTaskCallback = {this.deleteTaskCallback}
              checkedCheckboxCallback = {this.checkedCheckboxCallback}
              editTaskFinishedCallback = {this.editTaskFinishedCallback}
            />
          </section>
        </div>
      </div>
    );
  }
}

function uuidv4() {
  return 'axxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default App;
