import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import ActionButton from 'react-native-action-button';
import ListCards from './listcards'
import { Container, Header, Content, Button, Text, Card, CardItem, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../actions'

class Home extends Component {
    componentDidMount(){
        this.props.actions.loadDataEcommerce()
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f3f3', marginHorizontal: 5 }}>
                <ScrollView>
                    <ListCards />
                </ScrollView>
                <ActionButton buttonColor="#000000" onPress={()=> Actions.addproduct()} />
            </View>
        )
    }
}

function mapStateToProps(state){
    return{
      data: state.dataReducers
    }
  }
  
  function mapDispatchToProps(dispatch){
    return{
      actions: bindActionCreators(AppActions, dispatch)
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)