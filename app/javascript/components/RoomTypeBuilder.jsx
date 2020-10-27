import React from "react"
import RoomTypeBuilderWorkspace from "./RoomTypeBuilderWorkspace";
import RoomTypeBuilderTabs from "./RoomTypeBuilderTabs";
class RoomTypeBuilder extends React.Component {
  constructor(props) {
    super(props);

    var rooms 
    this.props.rooms && this.props.rooms.length
      ? rooms = this.props.rooms.map(room => room.id)
      : rooms = []

    this.state = {
      /* ui state */
      active_tab: 'general',
      room_type: this.props.room_type,
      rooms: rooms,
      all_rooms: this.props.all_rooms,
      all_room_types: this.props.all_room_types,
      room_type_create_path: this.props.room_type_create_path,
      room_type_save_path: this.props.room_type_save_path,
      is_new: this.props.is_new



    }
    this.setActiveTab = this.setActiveTab.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onChangeRooms = this.onChangeRooms.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.prepParams = this.prepParams.bind(this)
  }

  render () {
    console.log("builder", this.state)
    return (
      <div>
        <RoomTypeBuilderTabs {...this.state} setActiveTab={this.setActiveTab} />
        <RoomTypeBuilderWorkspace {...this.state} onNameChange={this.onNameChange} onDescriptionChange={this.onDescriptionChange} onChangeRooms={this.onChangeRooms} />
        <form ref="form" onClick={this.handleSubmit}>
          <button type="submit">Submit</button>
        </form>
      </div>
      
    );
  }

  onNameChange(event){
    // console.log("event",event.target.value)
    var room_type = this.state.room_type
    room_type.name = event.target.value
    this.setState({
      room_type: room_type
    })
  
  }
  onDescriptionChange(event){
    // console.log("event",event.target.value)
    var room_type = this.state.room_type
    room_type.description = event.target.value
    this.setState({
      room_type: room_type
    })
  
  }

  onChangeRooms(selected_rooms) {
    this.setState({rooms: selected_rooms})
  }

  prepParams() {
    return {
      room_type: {
        name: this.state.room_type.name,
        description: this.state.room_type.description,
      },
      associated_rooms:this.state.rooms
    }
  }

  handleSubmit(e){
    // var self = this
    
    
    e.preventDefault()
    var self = this
    console.log("submit state", self.state)
    var params = self.prepParams()
    self.setState({ loading: true })
    setTimeout(function () {
      $.ajax({
        type: 'POST',
        url: self.state.is_new
                ? self.state.room_type_create_path
                : self.state.room_type_save_path,
        data: params
      }).done(function (data) {
        // console.log(data.errors)
        if(Object.keys(data.errors).length){
          self.setState({
            errors: data.errors
          })
          self.setState({ loading: false })
        } else {
          self.setState({ loading: false })
          window.parent.$(window.parent).trigger("folioItemSavedSuccessfully")
          if (parent && parent.refresh_data) {
            parent.refresh_data(I18n.t('room_type_saved_successfully'))
          }
          if (parent && parent.hide_modal) {
            parent.hide_modal()
          }
        }
      })
    }, 1000)


  }


  setActiveTab(e, tab) {
    e.preventDefault()
    // console.log(e, tab)
    this.setState({
      active_tab: tab
    })
   
  }

}

export default RoomTypeBuilder