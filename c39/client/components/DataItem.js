import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { deletePhoneBook } from '../actions';

class DataItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false,
      name: this.props.data.name || '',
      phone: this.props.data.phone || ''
    }
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value })
  }

  handlePhoneChange(e) {
    this.setState({ phone: e.target.value })
  }

  handleEditClick() {
    this.setState({ editing: true })
  }

  handleSave() {
    var name = this.state.name.trim();
    var phone = this.state.phone.trim();
    if (!name || !phone) {
      return;
    }
    this.props.editPhoneBook(this.props.data.id, name, phone);
    this.setState({ editing: false })
  }

  render() {
    const { data, editPhoneBook, deletePhoneBook } = this.props
    if (this.state.editing) {
      return (
        <tr>
          <th>{data.id}</th>
          <td><input type="text" className="form-control" placeholder="name" value={this.state.name} onChange={this.handleNameChange.bind(this)} /></td>
          <td><input type="text" className="form-control" placeholder="phone" value={this.state.phone} onChange={this.handlePhoneChange.bind(this)} /></td>
          <td><button type="button" className="btn btn-primary" onClick={this.handleSave.bind(this)}><span className="glyphicon glyphicon-folder"></span> save </button></td>
        </tr>
      )
    } else {
      return (
        <tr>
          <th>{data.id}</th>
          <td>{data.name}</td>
          <td>{data.phone}</td>
          <td><button type="button" className="btn btn-success" onClick={this.handleEditClick.bind(this)}><span className="glyphicon glyphicon-pencil"></span> edit </button>&nbsp;<button type="button" className="delete-btn btn btn-danger" onClick={() => deletePhoneBook(data.id)}><span className="glyphicon glyphicon-trash"></span> delete</button></td>
        </tr>
      )
    }
  }
}

DataItem.propTypes = {
  data: PropTypes.object.isRequired,
  editData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired
}

export default DataItem
