import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../actions';
import DetailItem from './detailItem';
import './detail-items.css'
// import './detail-items.js'


class DetailItems extends Component {
    render() {
        let checked = this.props.data.filter((i) => {
           return this.props.match.params.id === i.id
        })
        return (
            <div className="container">
                <DetailItem
                    title={checked[0].title}
                    brand={checked[0].brand}
                    price={checked[0].price}
                    detail={checked[0].detail}
                    key={checked[0].id}
                    />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailItems)