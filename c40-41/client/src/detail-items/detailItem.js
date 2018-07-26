import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../actions';
import Remarkable from 'remarkable';
import './detail-items.css'
// import './detail-items.js'


class DetailItem extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-4 item-photo">
                    <img style={{ maxWidth: 100 + "%" }} src="https://ak1.ostkcdn.com/images/products/8818677/Samsung-Galaxy-S4-I337-16GB-AT-T-Unlocked-GSM-Android-Cell-Phone-85e3430e-6981-4252-a984-245862302c78_600.jpg" alt="" />
                </div>
                <div className="col-xs-5" style={{ border: 0 + "px solid gray" }}>
                    <h3>{this.props.title}</h3>
                    <h5 style={{ color: "#337ab7" }}>vendido por {this.props.brand} · <small style={{ color: "#337ab7" }}>(5054 ventas)</small></h5>
                    <h6 className="title-price"><small>PRECIO OFERTA</small></h6>
                    <h3 style={{ marginTop: 0 + "px" }}>Rp.{this.props.price.toLocaleString()}</h3>
                    <div className="section">
                        <h6 className="title-attr" style={{ marginTop: 15 + "px" }} ><small>COLOR</small></h6>
                        <div>
                            <div className="attr" style={{ width: 25 + "px", background: "#5a5a5a" }}></div>
                            <div className="attr" style={{ width: 25 + "px", background: "white" }}></div>
                        </div>
                    </div>
                    <div className="section" style={{ paddingBottom: 5 + "px" }}>
                        <h6 className="title-attr"><small>CAPACIDAD</small></h6>
                        <div>
                            <div className="attr2">16 GB</div>
                            <div className="attr2">32 GB</div>
                        </div>
                    </div>
                    <div className="section" style={{ paddingBottom: 20 + "px" }}>
                        <button className="btn btn-success"><span style={{ marginRight: 20 + "px" }} className="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> Agregar al carro</button>
                        <h6><a><span className="glyphicon glyphicon-heart-empty" style={{ cursor: "pointer" }}></span> Agregar a lista de deseos</a></h6>
                    </div>
                </div>
                <div className="col-xs-9">
                    <ul className="menu-items">
                        <li className="active">Detalle del producto</li>
                        <li>Garantía</li>
                        <li>Vendedor</li>
                        <li>Envío</li>
                    </ul>
                    <div style={{ width: 100 + "%", borderTop: 1 + "px solid silver" }} dangerouslySetInnerHTML={{ __html: new Remarkable().render(this.props.detail) }}>
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
)(DetailItem)