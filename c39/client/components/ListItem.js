import React, { Component, PropTypes } from 'react'
import DataItem from './DataItem'

class ListItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      name: '',
      phone: ''
    }
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value })
  }

  handlePhoneChange(e) {
    this.setState({ phone: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { data, actions } = this.props

    var name = this.state.name.trim().toLowerCase()
    var phone = this.state.phone.trim().toLowerCase()

    var filteredData = data

    if (name !== '' && phone !== '') {
      filteredData = data.filter(item => item.name.toLowerCase().startsWith(name) && item.phone.toLowerCase().startsWith(phone))
    } else if (name !== '') {
      filteredData = data.filter(item => item.name.toLowerCase().startsWith(name))
    } else if (phone !== '') {
      filteredData = data.filter(item => item.phone.toLowerCase().startsWith(phone))
    }

    let dataNodes = filteredData.map(function (data) {
      return (
        <DataItem key={data.id} data={data} {...actions} />
      )
    });
    return (
      <div className="row">
        <div className="panel panel-default">
          <div className="panel-heading">Search Form</div>
          <div className="panel-body">
            <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" placeholder="name" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="text" className="form-control" placeholder="phone" value={this.state.phone} onChange={this.handlePhoneChange.bind(this)} />
              </div>
            </form>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataNodes}
          </tbody>
        </table>
      </div>
    )
  }
}

ListItem.propTypes = {
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default ListItem
