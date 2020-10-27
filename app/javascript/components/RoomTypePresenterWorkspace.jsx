import React from "react"
// import PropTypes from "prop-types"
import RoomTypePresenterGeneral from "./RoomTypePresenterGeneral";
import RoomTypePresenterRooms from "./RoomTypePresenterRooms";
import RoomTypePresenterHistory from "./RoomTypePresenterHistory";

class RoomTypePresenterWorkspace extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.historical_view == true) {
      return (
        <div className="tab-content">
          <RoomTypePresenterGeneral {...this.props} />
          <RoomTypePresenterRooms {...this.props} />
          {/* <RoomTypePresenterHistory {...this.props} /> */}
        </div>
      )
    } else {
      return (
        <div className="tab-content">
          <RoomTypePresenterGeneral {...this.props} />
          <RoomTypePresenterRooms {...this.props} />
          <RoomTypePresenterHistory {...this.props} />
        </div>
      )
    }
  }
}

// RoomTypePresenterWorkspace.propTypes = {
//   room_type: PropTypes.object
// };
export default RoomTypePresenterWorkspace