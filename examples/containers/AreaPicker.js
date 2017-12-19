import React, {Component, PropTypes} from 'react';
import Picker from 'react-mobile-picker';
import area from './area.js';

export default class NamePicker extends Component {
  province = area;
  city = this.province[0].children;
  district = this.city[0].children;

  state = {
    valueGroups: {
      province: this.province[0],
      city: this.city[0],
      district: this.district[0],
    },
    optionGroups: {
      province: this.province,
      city: this.city,
      district: this.district,
    }
  };

  handleChange = (name, value) => {
    var newState = this.state;

    switch (name) {
      case 'province':
        newState = {
          optionGroups: {
            ...this.state.optionGroups,
            city: value.children,
            district: value.children[0].children,
          },
          valueGroups: {
            ...this.state.valueGroups,
            city: value.children[0],
            district: value.children[0].children[0],
          }
        }; 
        break;

      case 'city': 
        newState = {
          optionGroups: {
            ...this.state.optionGroups,
            district: value.children[0].children,
          },
          valueGroups: {
            ...this.state.valueGroups,
            district: value.children[0].children[0],
          }
        };
        break;
    }

    this.setState(({valueGroups}) => ({
      ...newState,
      valueGroups: {
        ...valueGroups,
        [name]: value
      }
    }));
  };

  render() {
    const {optionGroups, valueGroups} = this.state;

    return (
      <div className="example-container">
        <div className="weui_cells_title">3. Use 'textKey'</div>
        <div className="weui_cells">
          <div className="weui_cell">
            <div className="weui_cell_bd weui_cell_primary">Adreess, {valueGroups.province.name} {valueGroups.city.name} {valueGroups.district.name}</div>
          </div>
        </div>
        <div className="picker-inline-container">
          <Picker
            optionGroups={optionGroups}
            valueGroups={valueGroups}
            textKey="name"
            onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}
