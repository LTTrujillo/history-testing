import React from "react"
class RoomBuilderTabs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul className="nav nav-tabs">
          <li role="presentation" className={this.props.active_tab === 'general' ? 'active' : null}>
            <a href="#general" onClick={e => this.props.setActiveTab(e, 'general')}>
              {'general'}
            </a>
          </li>
        </ul>
      </div>
    )
  }

};

export default RoomBuilderTabs