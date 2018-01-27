import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './App.css';

const cssForm = {
  width: '10%',
  height: '5%',
  fontSize: '15px',
  textAlign: 'center',
  marginLeft: 'auto',
  marginRight: 'auto'
};

class login extends Component {
  constructor(props){
    super(props);
    this.state={email:'', password:''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    //alert('Email: ' + this.state.email + ' Pwd: ' + this.state.password);
    console.log('handleSubmit');
    this.props.doBackCall({ email: this.state.email, password: this.state.password});
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={cssForm}>
          <FormGroup controlId="email">
            <ControlLabel>Email</ControlLabel>
            <FormControl autoFocus type="text" value={this.state.email} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup controlId="password">
            <ControlLabel>Password</ControlLabel>
            <FormControl value={this.state.password} onChange={this.handleChange} type="password"/>
          </FormGroup>
          <span onClick={() => this.handleSubmit(0)}>pour tester</span>
          {this.props.token}
        </form>
      </div>
    );
  }
}

export default login;
