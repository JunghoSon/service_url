import React, { Component } from 'react';

class Locate extends Component{
    render(){
        return (
            <li><a href={this.props.loc} target="_blank">{this.props.title} :<br /><span>{this.props.loc}</span><br />{this.props.email} / {this.props.date}</a></li>
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