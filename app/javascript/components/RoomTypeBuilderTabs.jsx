import React from "react"
class RoomTypeBuilderTabs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log("tabs", this.props.active_tab)
  

    return (
      <div>
        <ul className="nav nav-tabs">
          <li role="presentation" className={this.props.active_tab === 'general' ? 'active' : null}>
            <a href="#general" onClick={e => this.props.setActiveTab(e, 'general')}>
              {'general'}
            </a>
          </li>
          <li role="presentation" className={this.props.active_tab === 'rooms' ? 'active' : null}>
            <a href="#rooms" onClick={e => this.props.setActiveTab(e, 'rooms')}>
              {'rooms'} 
            </a>
          </li>
        </ul>
      </div>
    )
  }

};

export default RoomTypeBuilderTabs