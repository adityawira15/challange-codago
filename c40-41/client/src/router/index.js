import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../actions';
import App from '../App';
import AddAds from '../add-ads';
import DetailItems from '../detail-items';
import configureStore from '../store';

class Routers extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/addads" component={AddAds} />
                    <Route path="/details/:id" component={DetailItems} />
                </Switch>
            </Router>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Routers)

