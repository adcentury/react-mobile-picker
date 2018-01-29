import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Picker from 'react-mobile-picker';

function generateNumberArray(begin, end) {
  let array = [];
  for (let i = begin; i <= end; i++) {
    array.push((i < 10 ? '0' : '') + i);
  }
  return array;
}

export default class BirthPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPickerShow: false,
      valueGroups: {
        year: '1989',
        month: '08',
        day: '12'
      },
      optionGroups: {
        year: generateNumberArray(1970, 2015),
        month: generateNumberArray(1, 12),
        day: generateNumberArray(1, 31)
      }
    };
  }

  handleChange = (name, value) => {
    this.setState(({valueGroups, optionGroups}) => {
      const nextState = {
        valueGroups: {
          ...valueGroups,
          [name]: value
        }
      };
      if (name === 'year' && valueGroups.month === '02') {
        const yearValue = parseInt(value);
        if ((yearValue % 4 === 0 && yearValue % 100 !== 0) || (yearValue % 400 === 0)) {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 29)
          };
        } else {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 28)
          };
        }
      } else if (name === 'month') {
        if (value === '02') {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 28)
          };
        } else if (['01', '03', '05', '07', '08', '10', '12'].indexOf(value) > -1 &&
          ['01', '03', '05', '07', '08', '10', '12'].indexOf(valueGroups.month) < 0) {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 31)
          };
        } else if (['01', '03', '05', '07', '08', '10', '12'].indexOf(value) < 0 &&
          ['01', '03', '05', '07', '08', '10', '12'].indexOf(valueGroups.month) > -1) {
          nextState.optionGroups = {
            ...optionGroups,
            day: generateNumberArray(1, 30)
          };
        }
      }
      return nextState;
    });
  };

  togglePicker = () => {
    this.setState(({isPickerShow}) => ({
      isPickerShow: !isPickerShow
    }));
  };

  render() {
    const {isPickerShow, optionGroups, valueGroups} = this.state;
    const maskStyle = {
      display: isPickerShow ? 'block' : 'none'
    };
    const pickerModalClass = `picker-modal${isPickerShow ? ' picker-modal-toggle' : ''}`;

    return (
      <div className="example-container">
        <div className="weui_cells_title">2. As a modal and bind to input field</div>
        <div className="weui_cells">
          <div className="weui_cell weui_cell_select weui_select_after">
            <div className="weui_cell_hd">Birthdate</div>
            <div className="weui_cell_bd weui_cell_primary">
              <input
                type="text"
                className="weui_select"
                value={valueGroups.year + '-' + valueGroups.month + '-' + valueGroups.day}
                readOnly
                onClick={this.togglePicker} />
            </div>
          </div>
        </div>
        <div className="picker-modal-container">
          <div className="picker-modal-mask" style={maskStyle} onClick={this.togglePicker}></div>
          <div className={pickerModalClass}>
            <header>
              <div className="title">Choose your birthdate</div>
              <a href="javascript:;" onClick={this.togglePicker}>OK</a>
            </header>
            <Picker
             optionGroups={optionGroups}
             valueGroups={valueGroups}
             onChange={this.handleChange} />
          </div>
        </div>
      </div>
    );
  }
}
