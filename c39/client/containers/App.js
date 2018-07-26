import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import AppTextInput from '../components/AppTextInput'
import ListItem from '../components/ListItem'
import * as AppActions from '../actions'

class App extends Component {
  componentDidMount(){
      this.props.actions.loadPhoneBooks();
  }

  render(){
    const {data, actions} = this.props
    return(
      <div className="container">
      <div className="row">
      <div className="well text-center"><h1>Hacktiv8 Phone Book Apps</h1></div>
      </div>
      <div className="row">
      <AppTextInput name="" phone="" onSave={actions.addPhoneBook} />
      </div>
      <ListItem data={data} actions={actions} />
      </div>
    )
  }
}

App.propTypes = {
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state){
  return{
    data: state.data
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
)(App)
