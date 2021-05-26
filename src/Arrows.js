import React from 'react'
import './Arrows.css'

class Arrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <>
        <div className="verticalArrows">
          <i onClick={() => this.props.moveTaskCallback(true)} className="fas fa-arrow-right fa-2x next"></i>
          <i onClick={() => this.props.moveTaskCallback(false)} className="fas fa-arrow-left fa-2x back"></i>  
        </div>
        <div className="horizontalArrows">
          <i onClick={() => this.props.moveTaskCallback(false)} className="fas fa-arrow-up fa-2x back"></i>
          <i onClick={() => this.props.moveTaskCallback(true)} className="fas fa-arrow-down fa-2x next"></i>  
        </div>
      </>
     );
  }
}
 
export default Arrow;