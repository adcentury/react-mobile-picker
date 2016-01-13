import React, {Component, PropTypes} from 'react';
import NamePicker from './NamePicker';
import BirthPicker from './BirthPicker';

export default class App extends Component {
  render() {
    return (
      <div className="page">
        <header className="page-header">
          <h1 className="page-title">React Picker</h1>
        </header>
        <main className="page-body">
          <p className="description">React Picker is a super simple component with no restriction, which means you can use it in any way you want.</p>
          <p className="description">Here are two examples:</p>
          <NamePicker />
          <BirthPicker />
        </main>
      </div>
    );
  }
}
