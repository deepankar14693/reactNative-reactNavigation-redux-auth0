import React, { Component } from 'react';
import { Picker } from 'react-native';

class PhaseDropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      phase: ''
    }
  }

  updatePhase = (phase) => {
    this.setState({ phase: phase });
  }

  render() {
    let projectDropdownOptions = this.props.projectDropdownOptions;

    return (
      <Picker selectedValue={this.state.phase} onValueChange={this.updatePhase}
        itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily: "Ebrima", fontSize: 17 }} >
        {
          projectDropdownOptions && projectDropdownOptions.length !== 0 && projectDropdownOptions.map((project, index) => {
            return (
              <Picker.Item label={project.label} value={project.value} key={index} />
            )
          })
        }
      </Picker>
    )

  }
}

export default PhaseDropdown;
