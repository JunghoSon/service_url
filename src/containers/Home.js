import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocateList, Sort } from 'components';
import { searchLocateRequest } from 'actions/locate';
import { searchEmailIdRequest } from 'actions/emailid';

class Home extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            initial: true,
            loadingState: false
        };
        
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }
    
    componentDidMount(){
        this.props.searchEmailIdRequest();
        this.props.searchLocateRequest(true, undefined, undefined)
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
        
        this.props.searchLocateRequest(false, lastId, this.props.emailId)
            .then(() => {
                if(this.props.isLast) alert('마지막 목록 입니다!');
                this.setState({
                    loadingState: false
                });
            });
    }
    
    sortLocate(emailId){
        this.props.searchLocateRequest(true, undefined, emailId)
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
    
    handleSort(emailId){
        if(!this.state.loadingState){
            this.sortLocate(emailId);
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
                <Sort emailIds={this.props.emailIds} onSearch={this.handleSort}/>
                {this.props.items.length === 0 && !this.state.initial ? noneList : list}
                {this.props.isLast || this.state.initial ? undefined : btnMore}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.locate.locate.status,
        items: state.locate.locate.items,
        isLast: state.locate.locate.isLast,
        emailId: state.locate.locate.emailId,
        emailStatus: state.emailid.emailid.status,
        emailIds: state.emailid.emailid.items,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchLocateRequest: (isInitial, id, emailId) => {
            return dispatch(searchLocateRequest(isInitial, id, emailId));
        },
        searchEmailIdRequest: () => {
            return dispatch(searchEmailIdRequest());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);