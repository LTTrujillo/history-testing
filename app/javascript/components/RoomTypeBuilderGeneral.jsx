import React from "react"
import classNames from 'classnames';
class RoomTypeBuilderGeneral extends React.Component {
  render () {
    // console.log("gen", this.props.active_tab)
    
    var tabClasses = classNames({
      'active': this.props.active_tab == 'general',
      'tab-pane': true
    });

    return (
      <div className={tabClasses} id="general">
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label>Room Type Name</label>
              <input className="form-control" value={this.props.room_type.name || ''} onChange={this.props.onNameChange}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label>Room Type Description</label>
              <input className="form-control" value={this.props.room_type.description || ''} onChange={this.props.onDescriptionChange}/>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

export default RoomTypeBuilderGeneral