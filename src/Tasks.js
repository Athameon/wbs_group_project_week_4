import React from 'react';
import Task from'./Task';

class Tasks extends React.Component {
  render() {
    const listItems = this.props.taskList.map((d) => 
      <Task 
        key={d.id}
        id={d.id}
        title={d.title}
        status={d.status}
        deleteTaskCallback = {this.props.deleteTaskCallback}
        checkedCheckboxCallback = {this.props.checkedCheckboxCallback}
      />);

    return (
      <div>
        { listItems }
      </div>
    );
  }
}

export default Tasks;