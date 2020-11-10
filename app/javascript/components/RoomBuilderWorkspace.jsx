import React from "react"
import RoomBuilderGeneral from "./RoomBuilderGeneral";
class RoomBuilderWorkspace extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="tab-content">
        <RoomBuilderGeneral {...this.props} />
      </div>
    )
  }
}
export default RoomBuilderWorkspace