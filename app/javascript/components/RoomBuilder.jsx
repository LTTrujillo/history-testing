import React from "react"
import RoomBuilderWorkspace from "./RoomBuilderWorkspace";
import RoomBuilderTabs from "./RoomBuilderTabs";
class RoomBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      /* ui state */
      active_tab: 'general',
      room: this.props.room,
      room_create_path: this.props.room_create_path,
      room_save_path: this.props.room_save_path,
      is_new: this.props.is_new



    }
    this.setActiveTab = this.setActiveTab.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.prepParams = this.prepParams.bind(this)
  }

  render () {
    console.log("builder", this.state)
    return (
      <div>
        <RoomBuilderTabs {...this.state} setActiveTab={this.setActiveTab} />
        <RoomBuilderWorkspace {...this.state} onNameChange={this.onNameChange} onDescriptionChange={this.onDescriptionChange} />
        <form ref="form" onClick={this.handleSubmit}>
          <button type="submit">Submit</button>
        </form>
      </div>
      
    );
  }

  onNameChange(event){
    // console.log("event",event.target.value)
    var room = this.state.room
    room.name = event.target.value
    this.setState({
      room: room
    })
  
  }
  onDescriptionChange(event){
    // console.log("event",event.target.value)
    var room = this.state.room
    room.description = event.target.value
    this.setState({
      room: room
    })
  
  }

  prepParams() {
    return {
      room: {
        name: this.state.room.name,
        description: this.state.room.description,
      },
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
                ? self.state.room_create_path
                : self.state.room_save_path,
        data: params
      }).done(function (data) {
        console.log(data)
        // if(Object.keys(data.errors).length){
        //   self.setState({
        //     errors: data.errors
        //   })
        //   self.setState({ loading: false })
        // } else {
        //   self.setState({ loading: false })
        //   window.parent.$(window.parent).trigger("folioItemSavedSuccessfully")
        //   if (parent && parent.refresh_data) {
        //     parent.refresh_data(I18n.t('room_saved_successfully'))
        //   }
        //   if (parent && parent.hide_modal) {
        //     parent.hide_modal()
        //   }
        // }
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

export default RoomBuilder