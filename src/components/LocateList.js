import React, { Component } from 'react';
import { Locate } from 'components';

class LocateList extends Component{
    render(){
        const mapToComponents = (items) => {
            return items.map((locate, i) => {
                return <Locate loc={locate.loc} title={locate.title} email={locate.email} date={locate.date} key={locate._id}/>
            });
        };
        
        return (
            <ul className="locate_list">
                {mapToComponents(this.props.items)}
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