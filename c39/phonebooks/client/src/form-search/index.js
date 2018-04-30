import React, { Component } from 'react'
import request from 'superagent'

class FormSearch extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            phone: ''
        }
        this.searchName = this.searchName.bind(this)
        this.searchPhone = this.searchPhone.bind(this)
    }

    searchName(e){
        this.setState({name: e.target.value})
        request
            .post('http://localhost:3000/api/phonebooks/search')
            .send({name: e.target.value, phone: this.state.phone})
            .set('accept', 'application/json')
            .end((err, response) => {
                this.props.searc(response.text)
            })
    }

    searchPhone(e){
        this.setState({phone: e.target.value})
        request
            .post('http://localhost:3000/api/phonebooks/search')
            .send({name: this.state.name, phone: e.target.value})
            .set('accept', 'application/json')
            .end((err, response) => {
                this.props.searc(response.text)
            })
    }

    render() {
        return (
            <div className="container">
                <br />
                <div className="panel panel-default">
                    <div className="panel-heading">Search Form</div>
                    <div className="panel-body">
                        <form className="form-inline" action="/action_page.php">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" onChange={this.searchName} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" className="form-control" onChange={this.searchPhone} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default FormSearch;