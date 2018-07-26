import React, { Component } from  'react';
import ReactPaginate from 'react-paginate';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import request from 'superagent'
import * as AppActions from '../actions';

class Pagination extends Component{
    constructor(props){
        super(props)
        this.state= {
            offset: 0,
            count: 0
        }
        this.setCount = this.setCount.bind(this)
    }

    setCount(){
        request
                .get('http://localhost:3000/api/ecommerce/count')
                .set('Accept', 'application/json')
                .end((err, response)=>{
                    let data = JSON.parse(response.text)
                    this.setState({count: data.count})
                })
    }

    componentDidMount() {
        this.props.actions.loadDataEcommerce(this.state.offset);
        this.setCount();
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 4);
        this.setState({offset: offset}, () => {
          this.props.actions.loadDataEcommerce(offset)
        });
      };

    render(){
        return(
            <ReactPaginate previousLabel={"previous"}
                           nextLabel={"next"}
                           breakLabel={<a href="">...</a>}
                           breakClassName={"break-me"}
                           pageCount={Math.ceil(this.state.count / 4)}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           onPageChange={this.handlePageClick}
                           containerClassName={"pagination"}
                           subContainerClassName={"pages pagination"}
                           activeClassName={"active"} />
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
)(Pagination)