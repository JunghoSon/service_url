import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocateList } from 'components';
import { searchLocateRequest } from 'actions/locate';

class Home extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            loadingState: false
        };
        
        this.handleSearch = this.handleSearch.bind(this);
    }
    
    componentDidMount(){
        this.props.searchLocateRequest(true, undefined);
    }
    
    loadLocate(){
        if(this.props.isLast){
            return new Promise((resolve, reject) => {
                resolve();
            });
        }
        
        let lastId = this.props.items[this.props.items.length - 1]._id;
        
        this.props.searchLocateRequest(false, lastId)
            .then(() => {
                if(this.props.isLast) alert('마지막 목록 입니다!');
                this.setState({
                    loadingState: false
                });
            });
    }
    
    handleSearch(isInitial){
        if(!this.state.loadingState){
            this.loadLocate();
            this.setState({
                loadingState: true
            });
        }
    }
    
    render(){
        return (
            <div className="container">
                <LocateList items={this.props.items}/>
                <a onClick={this.handleSearch} className="btn_more">MORE</a>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.locate.locate.status,
        items: state.locate.locate.items,
        isLast: state.locate.locate.isLast
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchLocateRequest: (isInitial, id) => {
            return dispatch(searchLocateRequest(isInitial, id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);