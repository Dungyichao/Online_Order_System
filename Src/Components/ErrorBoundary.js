import React, {Component} from 'react';

class ErrorBoundary extends Component {
    constructor(props){
        super(props);
        this.state = {
            haserror: false
        }
    }

    componentDidCatch(err, info){
        this.setState({haserror: true});
    }


    render(){
        if(this.state.haserror){
            return (<h1>There is error</h1>);
        }
        else{
            return(this.props.children);
        }
    }

}

export default ErrorBoundary;