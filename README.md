# React Mobile Picker

React Mobile Picker is a super simple component with no restriction, which means you can use it in any way you want.

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

### optionGroups [required]

- **Description**
Option groups as `{name: options}`. Key is the name of options, and value is an array of all options for this name.

- **Type:** Object

- **Examples** 
```javascript
{
  title: ['Mr.', 'Mrs.', 'Ms.', 'Dr.'],
  firstName: ['John', 'Micheal', 'Elizabeth'],
  secondName: ['Lennon', 'Jackson', 'Jordan', 'Legend', 'Taylor']
}
```

### valueGroups [required]

- **Description:**
Selected value groups as `{name: value}`. React Mobile Picker is a [Controlled Component](https://facebook.github.io/react/docs/forms.html#controlled-components), which means the selected value of the rendered element will always reflect the `valueGroups`.   
Every time you want to change the selected item, just modify `valueGroups`.

- **Type:** Object

- **Examples**
```javascript
{
  title: 'Mr.',
  firstName: 'Micheal',
  secondName: 'Jordan'
}
```

### onChange(name, value) [required]

- **Description**
Callback of selected value changing event. First parameter is the name of options, and second is the selected option's value.

- **Type:** Function

- **Examples**
```javascript
handleChange = (name, value) => {
  this.setState(({valueGroups}) => ({
    valueGroups: {
      ...valueGroups,
      [name]: value
    }
  }));
}
```

### itemHeight

- **Description**
Height of each item (that is each option). In `px`.

- **Type:** Number

- **Default:** 36

### height

- **Description**
Height of the picker. In `px`.

- **Type:** Number

- **Default:** 216
