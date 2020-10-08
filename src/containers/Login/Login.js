// 'rfc'
import React, { Component } from 'react'
import loginImg from "./login.svg";
import classes from './Login.module.css';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        loginCheck: false,
        phoneno: '',
        password: '',
        verification: false
    }
    inputHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    matchDetails = (phoneno,password) => {
        return new Promise((res,rej)=>{
            fetch('http://localhost:8080/loginCheck', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pass: password,
                    phoneno: phoneno
                })
            })
                .then(response => 
                    response.json())
                .then(json => {
                    var msg = JSON.parse(json);
                    console.log(msg);
                    console.log('Server recieved');
                    console.log('msg:',msg.msg);
                    res(msg.msg);
                })
                .catch(err => console.log(err));
        });
    }

    toHandler = async () => {
        const match= await this.matchDetails(this.state.phoneno,this.state.password);
        console.log('after await match is :'+match);
        if(match === '3'){
            this.props.history.push({pathname:'/home',hash:'success'});
        }
        else if(match === '2'){
            // this.props.history.push({pathname:'/home',hash:'success'});
            this.props.history.push({pathname:`/authentication/phonenumber=${this.state.phoneno}`,phone:this.state.phoneno});
            await this.gotoOtpVerif();
        }else if(match === '1'){
            this.props.history.push({pathname:'/email-verification',hash:'unverified'});
        }else{
            alert('please fill the corect details');
        }
    }

    gotoOtpVerif = () => {
        return new Promise((res,rej) => {
            fetch(`http://localhost:8080/login?phonenumber=${this.state.phoneno}&channel=sms`)
                .then(response => response.json())
                .then(json=>{
                    console.log(json);
                })
                .catch(err => console.log(err));
        });
    }

    render() {
        
        return (
            <div>
                <div className={classes.baseContainer} ref={this.props.containerRef}>
                    <div className={classes.header}>Login</div>
                    <div className={classes.content}>
                        <div >
                            <img src={loginImg} className={classes.image} />
                        </div>
                        <div className={classes.form}>
                            <div className={classes.formGroup}>
                                <label htmlFor="phoneno">PhoneNo</label>
                                <input type="text" name="phoneno" onChange={(e) => { this.inputHandler(e) }} value={this.state.phoneno} placeholder="Phone-no" />
                            </div>
                            <div className={classes.formGroup}>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" onChange={(e) => { this.inputHandler(e) }} value={this.state.password} placeholder="Password" />
                            </div>
                        </div>
                    </div>

                    <div className={classes.footer}>
                        <button onClick={this.toHandler}>
                            Login
                        </button>
                    </div>
    
                </div>


            </div>
        );
    }


};
export default Login;
