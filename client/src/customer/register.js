import React from 'react';
import axios from 'axios';

export default class farmerRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      farmerid: '',
      password: '',
    };
  }

  handleChange1 = (event) => {
    this.setState({ username: event.target.value });
  };
  handleChange2 = (event) => {
    this.setState({ farmerid: event.target.value });
  };
  handleChange3 = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      username: this.state.username,
      farmerid: this.state.farmerid,
      password: this.state.password,
    };
    console.log(user);

    axios({
      method: 'post',
      url: 'http://localhost:8000/farmers/register',
      data: user,
    }).then(function(response) {
      console.log(response.status);
    });
  };

  render() {
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>Email address</label>
            <input
              type='text'
              name='username'
              onChange={this.handleChange1}
              className='form-control'
              id='username'
              aria-describedby='emailHelp'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='farmerID'>FarmerID</label>
            <input
              type='text'
              name='farmerid'
              onChange={this.handleChange2}
              className='form-control'
              id='farmerID'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              onChange={this.handleChange3}
              className='form-control'
              id='password'
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
