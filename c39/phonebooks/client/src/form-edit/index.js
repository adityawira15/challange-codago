import React, { Component } from 'react'
import request from 'superagent'

class FormEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: ''
        }
        this.changeName = this.changeName.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.updated =this.updated.bind(this);
    }

    changeName(e){
        this.setState({name: e.target.value})
    }

    changePhone(e){
        this.setState({phone: e.target.value})
    }

    updated(){
        request
            .put('http://localhost:3000/api/phonebooks/' + this.props.dataedit._id)
            .set('Content-Type', 'application/json')
            .send({
                name: this.state.name.length != 0 ? this.state.name : this.props.dataedit.name,
                phone: this.state.phone.length != 0 ? this.state.phone : this.props.dataedit.phone
            })
            .then((err, val)=>{
                this.props.getdata()
            })
            this.props.hide()
    }

    render() {
        return (
            <div>
                <div className="container">
                    <br />
                    <div className="panel panel-success">
                        <div className="panel-heading">Edit Form</div>
                        <div className="panel-body">
                            <div className="form-inline">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" onChange={this.changeName} defaultValue={this.props.dataedit.name} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="text" className="form-control" onChange={this.changePhone} defaultValue={this.props.dataedit.phone} />
                                </div>
                                <button onClick={this.updated} className="btn btn-default">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FormEdit;