import React from "react"
import classNames from 'classnames';

class RoomTypePresenterRooms extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var roomsClasses = classNames({
      'active': this.props.active_tab == 'rooms',
      'tab-pane': true
    })
    return (
      <div className={roomsClasses} id="rooms">
        <label>Rooms</label>
        <ul>
          {this.renderData()}
        </ul>
        
      </div>  
    )
  }
  renderData() {
    if(this.props.rooms.length > 0) {

      return this.props.rooms.map(room => {
        return (
          <li key={room.id}>
            {room.name} 
          </li>
        )
      })
    } else {
      <p>"none"</p>
    }
  }
}

export default RoomTypePresenterRooms