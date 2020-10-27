import React from "react"
// import PropTypes from "prop-types"
import RoomTypeBuilderGeneral from "./RoomTypeBuilderGeneral";
import RoomTypeBuilderRooms from "./RoomTypeBuilderRooms"

class RoomTypeBuilderWorkspace extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tab-content">
        <RoomTypeBuilderGeneral {...this.props} />
        <RoomTypeBuilderRooms {...this.props} />
      </div>
    )
  }
}

// RoomTypeBuilderWorkspace.propTypes = {
//   room_type: PropTypes.object
// };
export default RoomTypeBuilderWorkspace