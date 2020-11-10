import React from "react"
import classNames from 'classnames';
class RoomPresenterHistory extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    // console.log("History", this.props)
    var tabClasses = classNames({
      'active': this.props.active_tab == 'history',
      'tab-pane': true
    })
    return (
      <div className={tabClasses} id="history">
        <div className="row">
          <div className="col-md-12">
          <h1>Listing Versions</h1>
 
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Created At</th>
              <th>Links</th>
            </tr>
            </thead>
            <tbody>
              {this.renderData()}
            </tbody>
          </table>
          </div>
        </div>
      </div>  
    )
  }
  renderData() {
    if(this.props.versions) {
      return this.props.versions.map(version => {
        return (
         <tr key={version.id}>
           <td>{version.id}</td> 
           <td>{version.created_at}</td> 
           <td><a href={`/room/${version.id}/show_version`}>Show Version</a></td>
           
         </tr>
        )
      })
    } else {
      "none"
    }
  }


}

export default RoomPresenterHistory