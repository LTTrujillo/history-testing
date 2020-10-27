import React from "react"
import $ from "jquery"

class MultiSelect extends React.Component {

  constructor(props) {
    
    super(props)
    this.selectAllNone = this.selectAllNone.bind(this)
    this.selectOne = this.selectOne.bind(this)
    this.isChecked = this.isChecked.bind(this)
    this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this)
    this.buildCheckboxLabel = this.buildCheckboxLabel.bind(this)
  }

  render() {
    // console.log("props", this.props)
    if (this.props.selected_inputs.length !== this.props.inputs.length && this.props.selected_inputs.length !== 0) {
      $(this.refs.selectAll).prop("indeterminate", true)
    }
    return (
      <div>
        <div className="select-all-none" id="selected_rooms" style={{ marginBottom: 4 }}>
          <div className="toggle">
            <input
              ref="selectAll"
              type="checkbox"
              style={{ marginRight: 12 }}
              checked={this.props.inputs.length === this.props.selected_inputs.length ? true : false}
              onChange={this.selectAllNone}
              disabled={this.props.inputs[0].input_status ? this.props.inputs[0].input_status : null}
             />
            {this.props.title_helper_text 
              ? <span>{`${this.props.header_primary.includes('missing') ? this.props.header_primary : this.props.header_primary}`}{this.props.header_secondary ? ` (${this.props.header_secondary})` : ''} <span className="ss-help help" title={this.props.title_helper_text}></span></span>
              : <span>{`${this.props.header_primary.includes('missing') ? this.props.header_primary : this.props.header_primary}`}{this.props.header_secondary ? ` (${this.props.header_secondary})` : ''}</span>
            }            
          </div>
          <hr />
          {this.renderForm(this.props.inputs)}
        </div>
        <div style={{ paddingTop: 10 }}>
          {/* {
            this.props.disabled_inputs
              ? this.renderForm(this.props.disabled_inputs)
              : null
          } */}
        </div>
      </div>
    )
  }

  renderForm(inputs) {
    var self = this
    var rendered_inputs = inputs.map(input => self.renderInput(input))
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="select-all-none">
            <div className="items">
              {rendered_inputs}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderInput(input) {
    // console.log('renderInput', input);
    return (
      <div className="item" key={input.id || input.label_primary}>
        <label className={input.label_secondary === 'disabled' ? 'disabled' : ''}>
          <input
            type="checkbox"
            style={{ marginRight: 12 }}
            value={input.id}
            checked={this.isChecked(input.id)}
            onChange={this.selectOne}
            disabled={input.input_status === 'disabled' ? true : false}
          />
          {this.buildCheckboxLabel(input)}
          {input.status && input.status == 'disabled' ? <em>{` (${'Disabled'})`}</em> : ""}
        </label>
      </div>
    )
  }

  buildCheckboxLabel(input) {
    var label = input.label_primary
    if (input.label_secondary && input.label_secondary.length) {
      //*** Billing Policy Rates Multiselect ***
      if (input.rate_status && input.rate_status === 'disabled') {
        label = <span>{label}<em>{` (${'Disabled'})`}</em>{` (${input.label_secondary})`}</span>
      } else {
        //*** Normal Multi Select
        label += ` (${input.label_secondary})`
      }
    }
    //*** Manage Rates Room Type Multi Select ***
    if (input.custom_label_secondary && input.custom_label_secondary.length) {
      if(input.custom_label_secondary == 'none') {
        label = <span>{label}<em>{` (${this.capitalizeFirstLetter(input.custom_label_secondary)})`}</em></span>
      } else  {
        label = <span>{label}{` (${this.capitalizeFirstLetter(input.custom_label_secondary)})`}</span>
      }
    }
    //*** Manage Product Taxes Multi Select ***
    if (input.tax_label_secondary) {
      label = <span>{label}{` (${parseFloat((input.tax_label_secondary * 100).toFixed(2))}%)`}</span>
    }
    return label
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  selectAllNone(event) {
    var selected_inputs = []
    if (event.target.checked) {
      selected_inputs = this.props.inputs.map(input => input.id)
    }
    this.props.onChange(selected_inputs)
    $(this.refs.selectAll).prop("indeterminate", false)
  }

  selectOne(event) {
    var selected_inputs
    if (event.target.checked) {
      selected_inputs = [...this.props.selected_inputs, parseFloat(event.target.value)]
      if (selected_inputs.length === this.props.inputs.length) {
        $(this.refs.selectAll).prop("indeterminate", false)
      }
    }
    else {
      selected_inputs = this.props.selected_inputs.filter(input => input !== parseFloat(event.target.value))
      if (!selected_inputs.length) {
        $(this.refs.selectAll).prop("indeterminate", false)
      }
    }
    this.props.onChange(selected_inputs)
  }

  isChecked(id) {

    if (this.props.selected_inputs && this.props.selected_inputs.length) {
      for (let i = 0; i < this.props.selected_inputs.length; i++) {
        if (this.props.selected_inputs[i] === id) {
          return true
        }
      }
    }
    return false
  }

}

// RoomTypeBuilderRooms.propTypes = {
//   room_type: PropTypes.object
// };
export default MultiSelect