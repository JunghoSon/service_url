import React, {Component} from 'react';

class Sort extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            sort: 'all'
        };
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    shouldComponentUpdate(nextProps, nextState){
        let current = {
            props: this.props,
            state: this.state
        };
        
        let next = {
            props: nextProps,
            state: nextState
        };
        
        let update = JSON.stringify(current) !== JSON.stringify(next);
        return update;
    }
    
    handleChange(e){
        this.setState({
            sort: e.target.value
        });
        
        this.props.onSearch(e.target.value);
    }
    
    render(){
        let mapToOptions = (items) => {
            return items.map((item, i) => {
                return (
                    <option value={item.emailId} key={i}>{item.emailId}</option>
                );
            });
        };
        
        return (
            <div className="sort">
                <select name="sort" className="round" onChange={this.handleChange} value={this.state.sort}>
                    <option value="all">all</option>
                    {mapToOptions(this.props.emailIds)}
                </select>
            </div>
        );
    }
}

Sort.propTypes = {
    emailIds: React.PropTypes.array,
    onSearch: React.PropTypes.func
};

Sort.defaultProps = {
    emailIds: [],
    onSearch: () => {
        console.log('Search func not defined');
    }
};

export default Sort;