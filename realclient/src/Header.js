import React, { Component } from 'react';

const cssLogin = {
  color: 'blue',
  fontSize: 40,
  textAlign: 'center'
};

class header extends Component {
  render() {
    return (
      <div>
          <h2 style={cssLogin}>SmartCalendar</h2>
      </div>
    );
  }
}

export default header;
