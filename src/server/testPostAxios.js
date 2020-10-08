import React, { Component } from 'react';
import img from '../containers/Login/login.svg';
import axios from './testAxios';

class TestPostAxios extends Component {

    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    componentDidMount = () => {
        const user = {
            A:'HELLO'
        }
        axios.post('/Courses/image1.json',user)
        .then(res => {
            console.log('res',res);
        })
        .catch(err => console.log(err))
    }
    
    render() {
        return (
            <div>
                <h1>jiiii</h1>
            </div>
        )
    }
}

export default TestPostAxios;