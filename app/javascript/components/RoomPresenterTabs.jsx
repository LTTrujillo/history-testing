import React from "react"
class RoomPresenterTabs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.history_view == true) {
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

    } else {

      return (
        
        <div>
          <ul className="nav nav-tabs">
            <li role="presentation" className={this.props.active_tab === 'general' ? 'active' : null}>
              <a href="#general" onClick={e => this.props.setActiveTab(e, 'general')}>
                {'general'}
              </a>
            </li>
            <li role="presentation" className={this.props.active_tab === 'history' ? 'active' : null}>
              <a href="#history" onClick={e => this.props.setActiveTab(e, 'history')}>
                {'history'} 
              </a>
            </li>
          </ul>
        </div>
      )
    }
  }

};

export default RoomPresenterTabs