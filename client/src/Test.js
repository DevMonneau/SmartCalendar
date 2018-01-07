import React, { Component } from 'react';
import Test2 from './Test2';
import Initprompt from './Initprompt'
import './App.css';

const test = {
	color: 'red',
	fontSize: 50
};

class Test extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		isOpen: false,
  	};
  }

  ok2 = () => {
  	this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div className="test">
        <p style={test}> toto 1234 </p>
        <Test2 test={this.ok2} />
        {!this.state.isOpen ? <Initprompt /> : null}
      </div>
    );
  }
}

export default Test;
