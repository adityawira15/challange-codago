import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as AppActions from '../actions';
import './add-ads.css'

class AddAds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            rate: '1',
            description: '',
            price: '',
            brand: '',
            detail: ''

        }
        this.handleSave = this.handleSave.bind(this)
    }

    title(e) {
        this.setState({ title: e.target.value })
    }

    rate(e) {
        this.setState({ rate: e.target.value })
    }

    description(e) {
        this.setState({ description: e.target.value })
    }

    price(e) {
        this.setState({ price: e.target.value })
    }

    brand(e) {
        this.setState({ brand: e.target.value })
    }

    detail(e) {
        this.setState({ detail: e.target.value })
    }

    handleSave(){
        this.props.actions.addDataEcommerce(this.state.title, parseInt(this.state.rate), this.state.description, parseInt(this.state.price), this.state.brand, this.state.detail);
        this.props.history.push("/")
    }

    render() {
        return (
            <div className="body">
                <div className="panel panel-primary">
                    <div className="panel-heading">Add Ads</div>
                    <div className="panel-body">
                        <div>
                            <div className="row">
                                <div className="col-md-2 right">
                                    <label htmlFor="title">Title</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="text" onChange={this.title.bind(this)} placeholder="Title" id="title" />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-2 right">
                                    <label htmlFor="rate">Rate</label>
                                </div>
                                <div className="col-md-10">
                                    <select id="rate" onChange={this.rate.bind(this)} className="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-2 right">
                                    <label htmlFor="description">Description</label>
                                </div>
                                <div className="col-md-10">
                                    <textarea className="form-control" rows="3" onChange={this.description.bind(this)} placeholder="Description" id="description" />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-2 right">
                                    <label htmlFor="price">Price</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="number" onChange={this.price.bind(this)} placeholder="Price" id="price" />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-2 right">
                                    <label htmlFor="brand">Brand</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="text" onChange={this.brand.bind(this)} placeholder="Brand" id="brand" />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-2 right">
                                    <label htmlFor="detail">Detail Producs</label>
                                </div>
                                <div className="col-md-10">
                                    <textarea className="form-control" onChange={this.detail.bind(this)} placeholder="Detail Products" id="detail" rows="5" />
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-sm-2 right">
                                </div>
                                <div className="col-sm-1">
                                    <button onClick={this.handleSave} className="btn btn-success">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AddAds))