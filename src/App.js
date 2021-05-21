import React from 'react';
import './App.css';
import Task from './Task';
import Tasks from './Tasks';
import Arrows from './Arrows';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskInput: "",
      data: [
        new Task({ 
          id: uuidv4(),
          title: "First",
          status: "todo",
          position: 0
        },),
        new Task({ 
          id: uuidv4(),
          title: "Second",
          status: "done",
          position: 1
        },),
        new Task({ 
          id: uuidv4(),
          title: "Third",
          status: "done",
          position: 2
        },)
      ],
      checkedChecboxes: []
    }
  }
  onNewTaskInput(event) {
    this.setState({ taskInput: event.target.value } );
    console.log(event.target.value);
  }

  deleteTaskCallback = (taskId) => {      
    console.log('Delete task with id: ', taskId);
    this.setState({data: this.state.data.filter(task => task.id !== taskId)})}

  createNewTask(event) {
    console.log("Called createNewTask with inputValue: " + this.state.taskInput);
    if(this.state.taskInput === '') {
      alert('The todo task must be named!');
      return;
    }
    console.log(Tasks);
    const tempData = this.state.data;
    tempData.push(new Task({ 
        id: uuidv4(),
        title: this.state.taskInput,
        status: "todo",
        position: 5
      }))
    this.setState({
      data: tempData
    })
    console.log(this.state.data);
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

  moveNextCallback = (event) => {
    console.log("Clicked next arrow. Checked checkBoxes: " + this.state.checkedChecboxes);
    let markedTasksToMove =[];
    this.state.checkedChecboxes.forEach(checkboxId => {
      markedTasksToMove.push(...this.state.data.filter(task => task.id === checkboxId));
    })
    // const tasksToMove = markedTasksToMove.filter(task => 
    //   task.status === "todo" || task.status === "inProgress");
    
    console.log(markedTasksToMove);
    let taskListCopy = [...this.state.data];

    markedTasksToMove.forEach(checkedTasks => {
      for(let i = 0; i < taskListCopy.length; i++) {
        const task = taskListCopy[i];
        console.log("check...", checkedTasks.id);
        if(task.id === checkedTasks.id) {
          console.log("move task task.id");
          if (task.status === 'todo') {
            
            task.status = 'inProgress';
          } else if(task.status === 'inProgress') {
            task.status = 'done';
          }
        }
      }
    })

    this.setState({
      data: taskListCopy,
      checkedChecboxes: []
    })
  }

  moveBackCallback = (event) => {
    console.log("Clicked back arrow");
    let markedTasksToMove =[];
    this.state.checkedChecboxes.forEach(checkboxId => {
      markedTasksToMove.push(...this.state.data.filter(task => task.id === checkboxId));
    })
    const tasksToMove = markedTasksToMove.filter(task => 
      task.status === "inProgress" || task.status === "done");
    
    console.log("Tasks to move", tasksToMove);
    let taskListCopy = [...this.state.data];
    
    markedTasksToMove.forEach(checkedTasks => {
      for(let i = 0; i < taskListCopy.length; i++) {
        const task = taskListCopy[i];
        console.log("check...", checkedTasks.id);
        if(task.id === checkedTasks.id) {
          console.log("move task task.id");
          if (task.status === 'inProgress') {
            task.status = 'todo';
          } else if(task.status === 'done') {
            task.status = 'inProgress';
          }
        }
      }
    })



    // taskListCopy.forEach(task => {
    //   markedTasksToMove.forEach(checkboxId => {
    //     if (task.status === 'inProgress') {
    //       task.status = 'todo';
    //     } else if(task.status === 'done') {
    //       task.status = 'inProgress';
    //     }
    //   })
    // })

    this.setState({
      data: taskListCopy,
      checkedChecboxes: []
    })
  }

  render() {

    const todoTask = <Tasks taskList={this.state.data.filter(task => task.status==="todo")}/>;
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
                this.state.data.filter(task => task.status === "todo")
              }
              deleteTaskCallback = {this.deleteTaskCallback}
              checkedCheckboxCallback = {this.checkedCheckboxCallback}
            />
          </section>
          <section className="arrows">
          <Arrows moveBack={this.moveBackCallback} moveNext={this.moveNextCallback} />
          </section>
          <section className="section" id="inProgress">
            <h2>In Progress</h2>
            <Tasks 
              taskList={
                this.state.data.filter(task => task.status === "inProgress")
              }
              deleteTaskCallback = {this.deleteTaskCallback}
              checkedCheckboxCallback = {this.checkedCheckboxCallback}
            />
          </section>
          <section className="arrows">
            <Arrows moveBack={this.moveBackCallback} moveNext={this.moveNextCallback} />
          </section>
          <section className="section" id="done">
            <h2>Done</h2>
            <Tasks 
              taskList={
                this.state.data.filter(task => task.status === "done")
              }
              deleteTaskCallback = {this.deleteTaskCallback}
              checkedCheckboxCallback = {this.checkedCheckboxCallback}
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
