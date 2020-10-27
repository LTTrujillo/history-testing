import React from "react"
import RoomTypePresenterWorkspace from "./RoomTypePresenterWorkspace";
import RoomTypePresenterTabs from "./RoomTypePresenterTabs";
class RoomTypePresenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* ui state */
      active_tab: 'general',
      room_type: this.props.room_type,
      rooms: this.props.rooms,
      all_rooms: this.props.all_rooms,
      all_room_types: this.props.all_room_types,
      versions: this.props.versions,
      show_version_path: this.props.show_version_path,
      history_view: this.props.history_view
      // room_type_create_path: this.props.room_type_create_path,
      // room_type_save_path: this.props.room_type_save_path,
      // is_new: this.props.is_new



    }
    this.setActiveTab = this.setActiveTab.bind(this)

  }

  render () {
    console.log("Presenter", this.props)
    return (
      <div>
        <RoomTypePresenterTabs {...this.state} setActiveTab={this.setActiveTab} />
        <RoomTypePresenterWorkspace {...this.state} onNameChange={this.onNameChange} onDescriptionChange={this.onDescriptionChange} onChangeRooms={this.onChangeRooms} />
      </div>
      
    );
  }


  setActiveTab(e, tab) {
    e.preventDefault()
    // console.log(e, tab)
    this.setState({
      active_tab: tab
    })
   
  }

}

export default RoomTypePresenter