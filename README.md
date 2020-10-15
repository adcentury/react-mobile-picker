# React Mobile Picker

[![Travis](https://img.shields.io/travis/adcentury/react-mobile-picker.svg)](https://travis-ci.org/adcentury/react-mobile-picker) [![npm](https://img.shields.io/npm/dm/react-mobile-picker.svg)](https://www.npmjs.com/package/react-mobile-picker) [![GitHub license](https://img.shields.io/github/license/adcentury/react-mobile-picker.svg)](https://github.com/adcentury/react-mobile-picker/blob/master/LICENSE)

React Mobile Picker is a super simple component with no restriction, which means you can use it in any way you want.

![screen-capture](./examples/screen-capture.gif)

## Preview

![qr](./examples/qr.png)

Scan this Qr in you mobile.

Or visit (in mobile or mobile simulator): [http://adcentury.github.io/react-mobile-picker](http://adcentury.github.io/react-mobile-picker)

## Install

```
npm install react-mobile-picker --save
```

## Usage

### ES6

```javascript
import Picker from 'react-mobile-picker';
```

### CommonJS

```javascript
var Picker = require('react-mobile-picker');
```

## Props

| Property name | Type | Default | Description |
| ------------- | ---- | ------- | ----------- |
| optionGroups | Object | N/A | Key-value pairs as `{name1: options1, name2: options2}`. `options` is an array of all options for this name. |
| valueGroups | Object | N/A | Selected value pairs as `{name1: value1, name2: value2}`. |
| onChange(name, value) | Function | N/A | Callback called when user pick a new value. |
| onClick(name, value) | Function | N/A | Callback called when user click on selected value. |
| itemHeight | Number | 36 | Height of each item (that is each option). In `px`. |
| height | Number | 216 | Height of the picker. In `px`. |
| scrollTransitionDuration | Number | 0 | Scroll duration in `milliseconds`. |

## Getting Started

By design, React Mobile Picker is a [Controlled Component](https://facebook.github.io/react/docs/forms.html#controlled-components), which means the selected value of the rendered element will always reflect the `valueGroups`. Every time you want to change the selected item, just modify `valueGroups` values.

Here is an example of how to integrate React Mobile Picker:

```javascript
import React, {Component} from 'react';
import Picker from 'react-mobile-picker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueGroups: {
        title: 'Mr.',
        firstName: 'Micheal',
        secondName: 'Jordan'
      }, 
      optionGroups: {
        title: ['Mr.', 'Mrs.', 'Ms.', 'Dr.'],
        firstName: ['John', 'Micheal', 'Elizabeth'],
        secondName: ['Lennon', 'Jackson', 'Jordan', 'Legend', 'Taylor']
      }
    };
  }

  // Update the value in response to user picking event
  handleChange = (name, value) => {
    this.setState(({valueGroups}) => ({
      valueGroups: {
        ...valueGroups,
        [name]: value
      }
    }));
  };

  render() {
    const {optionGroups, valueGroups} = this.state;

    return (
      <Picker
        optionGroups={optionGroups}
        valueGroups={valueGroups}
        onChange={this.handleChange} />
    );
  }
}
```

## More Examples

```
git clone this repo
npm install
npm start
point your browser to http://localhost:8080
```

## License

MIT.
