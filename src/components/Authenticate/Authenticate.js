import React, { Component } from 'react'
import classes from './Authenticate.module.css';
import loginImg from '../../containers/Login/login.svg';

class Authenticate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            otp: ''
        }
    }
    componentDidMount = () => {
        console.log(this.props);
        console.log(this.props.location.phone);
    }

    inputHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    toHandler = async () => {
        var msg=await this.otpVerifyHandler();
        console.log('msg',msg);
        if(msg === "approved"){
            this.props.history.push({pathname:'/home',hash:'success'});
        }
    }

    otpVerifyHandler = ()  => {
        return new Promise((res,rej) => {
            fetch(`http://localhost:8080/verifyPhone?phonenumber=${this.props.location.phone}&code=${this.state.otp}`)
                .then(response => response.json())
                .then(json=>{
                    console.log(json);
                    console.log(json.data.status);
                    res(json.data.status);
                })
                .catch(err => console.log(err));
        });
    }

    render() {
        return (
            <>
                <div className={classes.baseContainer} ref={this.props.containerRef}>
                    <div className={classes.header}>Verify your Phone Number</div>
                    <div className={classes.content}>
                        <div>
                            <img src={loginImg} className={classes.image} />
                        </div>
                        <div className={classes.form}>
                            <div className={classes.formGroup}>
                                <label htmlFor="otp">Verify Your OTP sent to {this.props.location.phone}</label>
                                <input type="text" name="otp" onChange={(e) => { this.inputHandler(e) }} value={this.state.otp} placeholder="OTP" />
                            </div>
                        </div>
                    </div>

                    <div className={classes.footer}>
                        <button onClick={this.toHandler}>
                            ENTER
                        </button>
                    </div>

                </div>
            </>
        )
    }
}

export default Authenticate;
