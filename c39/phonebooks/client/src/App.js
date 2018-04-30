import React, { Component } from 'react';
import FormAdd from './form-add'
import FormEdit from './form-edit'
import FormSearch from './form-search'
import Tables from './tables'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      getdata: false,
      formedit: false,
      datasearch: []
    }
    this.clickAdd = this.clickAdd.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
    this.hideAdd = this.hideAdd.bind(this);
    this.hideEdit = this.hideEdit.bind(this);
    this.getData = this.getData.bind(this);
    this.searchData = this.searchData.bind(this);
  }

  clickAdd(){
    this.props.buttonAddToggle()
  }

  clickEdit(response){
    this.props.buttonUpdate(JSON.parse(response))
  }

  getData(){
    this.props.getData()
    // this.setState({getdata: true})
  }

  searchData(response){
    this.setState({
      datasearch: JSON.parse(response)
    })
  }

  hideAdd(){
    this.props.buttonAdd()
  }

  hideEdit(){
    this.props.buttonSave()
  }

  render() {
    return (
      <div className="body">
        <div className="title">
          <h1>Phone Book Apps</h1>
        </div>
        <br />
        <button type="button" onClick={this.clickAdd} className="btn btn-primary" id="btn-add">
          <span className="glyphicon glyphicon-plus" ></span> Add
        </button>
        {/* {this.props.value.formAdd == true ? <FormAdd getdata={this.getData} hide={this.hideAdd} /> : null}
        {this.props.value.formEdit == true ? <FormEdit getdata={this.getData} hide={this.hideEdit} dataedit={this.props.value.dataEdit} /> : null}
        <FormSearch searc={this.searchData} />
        <Tables searc={this.state.datasearch} clickedit={this.clickEdit} data={this.props.value.rData} getdata={this.getData} /> */}
      </div>
    );
  }
}

export default App;

