import React from "react"
// import PropTypes from "prop-types"
import RoomPresenterGeneral from "./RoomPresenterGeneral";
import RoomPresenterHistory from "./RoomPresenterHistory";

class RoomPresenterWorkspace extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.historical_view == true) {
      return (
        <div className="tab-content">
          <RoomPresenterGeneral {...this.props} />
          {/* <RoomPresenterHistory {...this.props} /> */}
        </div>
      )
    } else {
      return (
        <div className="tab-content">
          <RoomPresenterGeneral {...this.props} />
          <RoomPresenterHistory {...this.props} />
        </div>
      )
    }
  }
}

// RoomPresenterWorkspace.props = {
//   room_: Props.object
// };
export default RoomPresenterWorkspace