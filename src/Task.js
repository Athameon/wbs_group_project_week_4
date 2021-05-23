import React from 'react';

class Task extends React.Component {
  constructor(args = {}) {
    console.log(`Create Task object with following values: id: ${args.id}, title: ${args.title}, status: ${args.status}, position: ${args.position}`);
    super(args);
    this._id = args.id;
    this._title = args.title;
    this._status = args.status;
    this._position = args.position;
    this.state = { taskTitle: args.title, editMode: false }
  }

  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  set title(title) {
    this._title = title;
  }
  get status() {
    return this._status;
  }
  set status(status) {
    this._status = status;
  }

  clickedPen() {
    if (this.state.editMode) {
      this.finishEditTask();
    } else {
      this.setState({ editMode: true } );
    }
  }

  finishEditTask() {
    this.props.editTaskFinishedCallback(this.id, this.state.taskTitle);
    this.setState({ editMode: false } );
  }
  editTask() {

  }

  render() {
    return (
      <div className="item" id={this.id}>
        <div>
          <input onChange={(event) => this.props.checkedCheckboxCallback(this.id, event)} type="checkbox" />
          { this.state.editMode? 
            <input 
              onChange={(event) => this.setState({ taskTitle: event.target.value } )}
              onKeyUp={(event) => {event.key === 'Enter' && this.finishEditTask()}} 
              className="edit"
              type="text" 
              value={this.state.taskTitle} />
          : <span className="text">{this.state.taskTitle}</span> 
          }
        </div>
        <div className="itemItems">
          <i onClick={() => this.clickedPen()} className="fas fa-pen"></i>
          <i onClick={() => this.props.deleteTaskCallback(this.id)} className="fas fa-trash-alt"></i>
        </div>
      </div>
    );
  }
}

export default Task;