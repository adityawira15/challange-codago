import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as AppActions from './actions';
import Cards from './cards/cardList';
import Pagination from './pagination'
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="body">
        <Link to="/addads"><button type="button" className="btn btn-primary">Add Ads</button></Link>
        <Cards />
        <Pagination />
      </div>
    );
  }
}


