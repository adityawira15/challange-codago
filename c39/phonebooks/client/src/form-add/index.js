import React, { Component } from 'react';
import request from 'superagent'

class FormAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: true,
            name: '',
            phone: ''
        }
        this.save = this.save.bind(this);
        this.getName = this.getName.bind(this);
        this.getphone = this.getphone.bind(this);
    }

    getName(e) {
        this.setState({ name: e.target.value })
    }

    getphone(e) {
        this.setState({ phone: e.target.value })
    }

    save() {
        request
            .post('http://localhost:3000/api/phonebooks')
            .send({ name: this.state.name, phone: this.state.phone })
            .set('accept', 'application/json')
            .end((err, val) => {
                this.props.getdata()
            })
            this.props.hide()
    }

    render() {
        return (
            <div>
                <div className="container">
                    <br />
                    <div className="panel panel-primary">
                        <div className="panel-heading">Add Form</div>
                        <div className="panel-body">
                            <form className="form-inline" method="POST" onSubmit={this.save}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" onChange={this.getName} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" className="form-control" onChange={this.getphone} />
                                </div>
                                <button type="submit" className="btn btn-default" id="btn-save">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FormAdd