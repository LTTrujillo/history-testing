import React from "react"
import classNames from 'classnames';
import MultiSelect from "./MultiSelect"
class RoomTypeBuilderRooms extends React.Component {
  constructor(props) {
    super(props)
   
  }
  render () {
    var tabClasses = classNames({
      'active': this.props.active_tab == 'rooms',
      'tab-pane': true
    })

    var inputs = this.props.all_rooms.map(room => {
      var typeName = 'none'
      this.props.all_room_types.map(type => {
        if(type.id == room.room_type_id){
          typeName = type.name
        }
      })
      return {
          label_primary: room.name,
          custom_label_secondary: room.description,
          id: room.id
        }
      })

    return (
      <div className={tabClasses} id="rooms">
        <div className="row">
          <div className="col-md-12">
          { inputs.length
          ?
            <MultiSelect 
              header_primary="room id"
              header_secondary="room type name"
              inputs={inputs}
              selected_inputs={this.props.rooms}
              onChange={e => this.props.onChangeRooms(e)}/>
          : 
            <div className="no-records">
              <span className="none">{'none'}</span>
            </div>
          }
          </div>
        </div>        
      </div>  
    )
  }
}

export default RoomTypeBuilderRooms