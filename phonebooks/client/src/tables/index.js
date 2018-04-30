import React, { Component } from "react";
import request from 'superagent'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class Tables extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: 0,
            dataPhone: []
        }
        this.getData = this.getData.bind(this);
        this.editData = this.editData.bind(this);
        this.deltData = this.deltData.bind(this);
    }

    getData() {
        request
            .get('http://localhost:3000/api/phonebooks')
            .set('accept', 'json')
            .end((err, val) => {
                this.setState({ dataPhone: JSON.parse(val.text) })
            })

    }

    editData(response) {
        request
            .get('http://localhost:3000/api/phonebooks/' + response)
            .set('accept', 'json')
            .end((err, val) => {
                this.props.clickedit(val.text)
            })

    }

    deltData(response) {
        confirmAlert({
            title: 'Delete Contact ' + response[1],
            message: 'Are you sure delete this ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        request
                            .delete('http://localhost:3000/api/phonebooks/' + response[0])
                            .set('accept', 'application/json')
                            .end(() => {
                                this.getData()
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {

                    }
                }
            ]
        })

    }

    componentWillMount() {
        this.getData()

    }

    componentDidUpdate() {
        if (this.props.data) {
            this.getData()
            this.props.getdata()
        }

        if (this.props.searc.length != 0) {
            this.state.dataPhone = this.props.searc;
        }
    }

    render() {
        return (
            <div>
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
                        {
                            this.state.dataPhone.map((val, i) => {
                                return (
                                    <tr>
                                        <th scope="row">
                                            <input type="hidden" value="'+ data._id + '" className="id" />
                                            {i + 1}
                                        </th>
                                        <td>
                                            {val.name}
                                        </td>
                                        <td>
                                            {val.phone}
                                        </td>
                                        <td>
                                            <button className="btn btn-success update-button" onClick={() => this.editData(val._id)}>
                                                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> Update
                                            </button>
                                            <span> </span>
                                            <button className="btn btn-danger delete-button" onClick={() => this.deltData([val._id, val.name])}>
                                                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Tables;