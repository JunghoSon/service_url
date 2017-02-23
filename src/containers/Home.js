import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocateList } from 'components';
import { searchLocateRequest } from 'actions/locate';

class Home extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            initial: true,
            loadingState: false
        };
        
        this.handleSearch = this.handleSearch.bind(this);
    }
    
    componentDidMount(){
        this.props.searchLocateRequest(true, undefined)
            .then(() => {
                this.setState({
                    initial: false
                });
            });
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
    
    handleSearch(){
        if(!this.state.loadingState){
            this.loadLocate();
            this.setState({
                loadingState: true
            });
        }
    }
    
    render(){
        let list = (
            <LocateList items={this.props.items}/>
        );
        
        let noneList = (
            <p>저장된 목록이 없습니다.</p>
        );
        
        let btnMore = (
            <a onClick={this.handleSearch} className="btn_more round">MORE</a>
        );
        return (
            <div className="container">
                {this.props.items.length === 0 ? noneList : list}
                {this.props.isLast || this.state.initial ? undefined : btnMore}
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