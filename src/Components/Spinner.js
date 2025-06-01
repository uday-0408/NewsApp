import React, { Component } from 'react'
import spinner1 from '../spinners/1.gif';
// import spinner2 from '../spinners/2.gif';
// import spinner3 from '../spinners/3.gif';

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center my-3">
        <img src={spinner1} alt="Loading..." className="text-center my-5" />
      </div>
    )
  }
}
