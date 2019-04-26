import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './AddTask.scss';

class AddTask extends Component {
  render() {
    return (
      <Link to='/add'>
        <button id='add-button'>
          <div id='text-button'>
            <FontAwesomeIcon id='icon-plus' icon='plus' />
            <h2>ADD TASK</h2>
          </div>
        </button>
      </Link>
    );
  }
}

export default AddTask;
