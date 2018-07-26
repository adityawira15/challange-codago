import React, { Component } from 'react'
import ImageCard from './imagecard'
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import * as AppActions from '../actions'

class Details extends Component {
    render() {
        const filter = this.props.data.filter(value => value.id == this.props.id)
        const data = filter[0]
        return (
            <View style={{ margin: 5 }}>
                <ScrollView>
                    <ImageCard image={data.image} />
                    <View style={style.textview}>
                        <Text style={style.textbold}>
                            Title :
                    </Text>
                        <Text style={style.textvalue}>
                            {data.title}
                        </Text>
                        <Text style={style.textbold}>
                            Rate :
                    </Text>
                        <Text style={style.textvalue}>
                            {data.rate}
                        </Text>
                        <Text style={style.textbold}>
                            Description :
                    </Text>
                        <Text style={style.textvalue}>
                            {data.description}
                        </Text>
                        <Text style={style.textbold}>
                            Price :
                    </Text>
                        <Text style={style.textvalue}>
                            {data.price}
                        </Text>
                        <Text style={style.textbold}>
                            Brand :
                    </Text>
                        <Text style={style.textvalue}>
                            {data.brand}
                        </Text>
                        <Text style={style.textbold}>
                            Detail :
                    </Text>
                        <Text style={style.textvalue}>
                            {data.detail}
                        </Text>
                        <Button
                            onPress={() => Actions.pop()}
                            title="< Back"
                            color="#cecece"
                            accessibilityLabel="Go Back"
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const style = StyleSheet.create({
    textview: {
        margin: 15
    },
    textbold: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textvalue: {
        fontSize: 20,
        margin: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    }
})

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
)(Details)