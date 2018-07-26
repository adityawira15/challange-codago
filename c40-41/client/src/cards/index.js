import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AppActions from '../actions';
import './card.css'

class Cards extends Component {
    constructor(props) {
        super(props)
        this.star = this.star.bind(this)
        this.detailProducts = this.detailProducts.bind(this)
    }

    detailProducts(id) {
        this.props.actions.getDataById(id);
    }

    star(val) {
        if (val === 1) {
            return (
                <div className="star">
                    <span className="glyphicon glyphicon-star" />
                    <span className="glyphicon glyphicon-star-empty" />
                    <span className="glyphicon glyphicon-star-empty" />
                    <span className="glyphicon glyphicon-star-empty" />
                    <span className="glyphicon glyphicon-star-empty" />
                </div>
            )
        } else if (val === 2) {
            return (
                <div className="star">
                    <span className="glyphicon glyphicon-star" />
                    <span className="glyphicon glyphicon-star" />
                    <span className="glyphicon glyphicon-star-empty" />
                    <span className="glyphicon glyphicon-star-empty" />
                    <span className="glyphicon glyphicon-star-empty" />
                </div>
            )
        } else if (val === 3) {
            return (
                <div className="star">
                    <span className="glyphicon glyphicon-star" />
                    <span className="glyphicon glyphicon-star" />
                    <span className="glyphicon glyphicon-star" />
                    <span className="glyphicon glyphicon-star-empty" />
                    <span className="glyphicon glyphicon-star-empty" />
                </div>
            )
        } else if (val === 4) {
            return (
                <div className="star">
                    <span className="glyphicon glyphicon-star" />
                    <span className="glyphicon glyphicon-star" />
                    <span className="glyphicon glyphicon-star" />
                    <span className="glyphicon glyphicon-star" />
                    <span className="glyphicon glyphicon-star-empty" />
                </div>
            )
        } else if (val === 5) {
            return (
                <div className="star">
                    <span className="glyphicon glyphicon-star" />
                    <span className="glyphicon glyphicon-star" />
                    <span className="glyphicon glyphicon-star" />
                    <span className="glyphicon glyphicon-star" />
                    <span className="glyphicon glyphicon-star" />
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="col-lg-3">
                    <div className="card">
                        <img src="http://cevirdikce.com/proje/hasem-2/images/finance-3.jpg" alt="" />
                        <h4><b>{this.props.title}</b></h4>
                        {this.star(this.props.star)}
                        <p>{this.props.description}</p>
                        <h2>Rp.{this.props.price.toLocaleString()}</h2>
                        <Link to={"/details/" + this.props.id} onClick={() => this.detailProducts(this.props.id)} className="btn btn-success blue-button">Detail Items</Link>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cards)