import React, { Component } from 'react';
import AddForm from '../../components/AddForm';


class Add extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activeLib: this.props.activeLib,
    };
  }

  render() {
    return (
      <AddForm 
      />
    );
  }
}

export default Add;
