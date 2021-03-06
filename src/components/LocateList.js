import React, { Component } from 'react';
import { Locate } from 'components';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';

class LocateList extends Component{
    shouldComponentUpdate(nextProps, nextState){
        let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
        return update;
    }
    
    render(){
        const mapToComponents = (items) => {
            return items.map((locate, i) => {
                return (
                    <Locate loc={locate.loc} title={locate.title} email={locate.email} date={locate.date} key={locate._id}/>
                );
            });
        };
        
        return (
            <ul className="locate_list">
                <ReactCssTransitionGroup
                    transitionName="locate"
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={10}>
                        {mapToComponents(this.props.items)}
                </ReactCssTransitionGroup>
            </ul>
        );
    }
}

LocateList.propTypes = {
    items: React.PropTypes.array
};

LocateList.defaultProps = {
    items: []
};

export default LocateList;