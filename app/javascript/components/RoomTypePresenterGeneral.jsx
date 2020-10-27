import React from "react"
import classNames from 'classnames';
class RoomTypePresenterGeneral extends React.Component {
  render () {
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
              <div>{this.props.room_type.name || ''}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <label>Room Type Description</label>
              <div>{this.props.room_type.description || ''}</div>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

export default RoomTypePresenterGeneral