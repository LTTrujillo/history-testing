import React from "react"
import RoomPresenterWorkspace from "./RoomPresenterWorkspace";
import RoomPresenterTabs from "./RoomPresenterTabs";
class RoomPresenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* ui state */
      active_tab: 'general',
      room: this.props.room,
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
        <RoomPresenterTabs {...this.state} setActiveTab={this.setActiveTab} />
        <RoomPresenterWorkspace {...this.state} />
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

export default RoomPresenter