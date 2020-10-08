import React,{Component} from 'react';

export default class Verify extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        fetch(`http://localhost:8080/verify?email=${this.props.match.params.email}&id=${this.props.match.params.id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));

    }

    render(){
        return(
            <h1 style={{marginLeft:'50px'}}>Thank You for verifying</h1>
        );
    }
} 