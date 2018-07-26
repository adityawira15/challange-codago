import React, { Component } from 'react'
import { View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../actions'
import Cards from './cards'

class ListCards extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const cards = this.props.data.map((val, i) => {
            return(
                <Cards 
                id={val.id}
                title={val.title} 
                rate={val.rate} 
                image={val.image}
                description={val.description}
                key={i} />
            )
        })
        return (
            <View>
                {cards}
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.dataReducers
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
)(ListCards)