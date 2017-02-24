import React, { Component } from 'react';

class Locate extends Component{
    constructor(props){
        super(props);
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
    
    render(){
        let d = new Date(this.props.date);
        let date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        
        return (
            <li className="round">
                <a href={this.props.loc} target="_blank">
                    <dl>
                        <dt>{this.props.title}</dt>
                        <dd>{this.props.loc}</dd>
                        <dd>{this.props.email}</dd>
                        <dd>{date}</dd>
                    </dl>
                </a>
            </li>
        );
    }
}

Locate.propTypes = {
    loc: React.PropTypes.string,
    title: React.PropTypes.string,
    email: React.PropTypes.string,
    date:React.PropTypes.string
};

Locate.defaultProps = {
    loc: '',
    title: '',
    email: '',
    date: ''
};

export default Locate;