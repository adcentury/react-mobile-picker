import React, { Component } from "react";
import PropTypes from "prop-types";
import Picker from "react-mobile-picker";

export default class NamePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueGroups: {
        title: {
          label: <span style={{color: 'red'}}>"Mr."</span>,
          value: 0
        },
        firstName: {
          label: "Michael",
          value: 0
        },
        secondName: {
          label: "Jordan",
          value: 0
        }
      },
      optionGroups: {
        title: [
          {
            label: <span style={{color: 'red'}}>Mr.</span>,
            value: 0
          },
          {
            label: <span style={{color: 'green'}}>Mrs.</span>,
            value: 1
          },
          {
            label: <span style={{color: 'blue'}}>Ms.</span>,
            value: 2
          },
          {
            label: <span style={{color: 'grey'}}>Dr.</span>,
            value: 3
          }
        ],
        firstName: [
          {
            label: "John",
            value: 0
          },
          {
            label: "Micheal",
            value: 1
          },
          {
            label: "Elizabeth",
            value: 2
          }
        ],
        secondName: [
          {
            label: "Lennon",
            value: 0
          },
          {
            label: "Jackson",
            value: 1
          },
          {
            label: "Jordan",
            value: 2
          },
          {
            label: "Legend",
            value: 3
          },
          {
            label: "Taylor",
            value: 4
          }
        ]
      }
    };
  }

  handleChange = (name, value) => {
    this.setState(({ valueGroups }) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value
      }
    }));
  };

  render() {
    const { optionGroups, valueGroups } = this.state;

    return (
      <div className="example-container">
        <div className="weui_cells_title">1. As an inline component</div>
        <div className="weui_cells">
          <div className="weui_cell">
            <div className="weui_cell_bd weui_cell_primary">
              Hi, {valueGroups.title.label} {valueGroups.firstName.label}{" "}
              {valueGroups.secondName.label}
            </div>
          </div>
        </div>
        <div className="picker-inline-container">
          <Picker
            optionGroups={optionGroups}
            valueGroups={valueGroups}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
