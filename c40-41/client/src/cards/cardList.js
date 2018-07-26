import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../actions';
import Cards from './index'
class CardList extends Component{
    render(){
        let dataNodes = this.props.data.map((val, index) => {
            return (
                <Cards 
                title={val.title}
                star={val.rate}
                description={val.description}
                price={val.price}
                id={val.id}
                key={'adit'+val.id}
                />
            )
        })
        return(
            <div className="index-content">
                <div className="container">
                    {dataNodes}
                </div>
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
)(CardList)