import { Component } from 'react';
import './Spinner.scss';

export default class Spinner extends Component {
  render() {
    return (
      <div className="spinner-container">
        <div className="spinner" />
      </div>
    );
  }
}
