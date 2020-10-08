import React, { Component } from 'react';
import loginImg from "../Login/login.svg";
import classes from './AdminAdd.module.css';

class AdminAdd extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            phoneno: '',
            adminPassword: '',
            email_error: '',
            admin_error: '',
            phoneno_error: '',
            error: '',
            entriesCheck: false
        }
    }

    componentDidMount = async () => {
        // var a=await this.doesnotExistPhone('09899009407');
        
    }


    inputHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    doesnotExist = (email) => {
        return new Promise((res, rej) => {
            fetch(`http://localhost:8080/getEmail?email=${email}`)
                .then(response => response.json())
                .then(json => {
                    var msg = JSON.parse(json)
                    console.log(msg.msg);
                    if (msg.msg === 'pass') {
                        console.log('returning 1111')
                        res(1);
                    }
                })
        })

    }

    doesnotExistPhone = (phoneno) => {
        return new Promise((res, rej) => {
            fetch(`http://localhost:8080/getPhoneno?phoneno=${phoneno}`)
                .then(response => response.json())
                .then(json => {
                    var msg = JSON.parse(json)
                    if (msg.msg === 'pass') {
                        res(1);
                    }
                })
        })

    }

    checkSanctity = async (name, pass, email, phoneno) => {
        console.log()
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email !== '' && name !== '' && pass !== '' && phoneno !== '' && this.state.adminPassword !== '') {
            this.setState({ error: '' });
            console.log('all details error passed');

            if (this.state.adminPassword === 'akashmalik') {
                this.setState({ admin_error: '' });
                console.log('admin pass passed');

                if (await this.doesnotExist(this.state.email) === 1) {
                    console.log('doesnot exist email passed');
                    this.setState({ email_error: '' });

                    if (phoneno.length === 10) {
                        this.setState({ phoneno_error: '' });
                        console.log('phoneno length passed');

                        if (await this.doesnotExistPhone(phoneno) === 1) {
                            this.setState({ phoneno_error: '' });
                            console.log('phoneno passed');

                            if (reg.test(email)) {
                                this.setState({ email_error: '' });
                                console.log('email format passed');
                                console.log('returning true');
                                return true;
                            } else {
                                this.setState({ email_error: 'check your email format' });
                                console.log('email format failed');
                            }
                        } else {
                            this.setState({ phoneno_error: 'Phone no already exist' });
                            console.log('phoneno already failed');
                        }
                    } else {
                        this.setState({ phone_error: 'phoneno format wrong' });
                        console.log('phoneno length failed');
                    }
                } else {
                    this.setState({ email_error: 'email already exist' });
                    console.log('doesnot exist email failed');
                }
            } else {
                this.setState({ admin_error: 'admin password is wrong' });
                console.log('admin pass failed');
            }
        } else {
            this.setState({ error: 'please complete the details' });
            console.log('all details error failed');
        }
    };

    successHandler = async () => {
        const check = await this.checkSanctity(
            this.state.name,
            this.state.password,
            this.state.email,
            this.state.phoneno,
        );
        this.setState({ entriesCheck: check });
        console.log('done');
        if (this.state.entriesCheck) {
            this.toHandler().then((res)=>{
                console.log(res);
                alert(res);
            })
            alert('done');
            this.props.history.push({ pathname: '/send' });
        }

    };

    toHandler = () => {
        
        return new Promise((res,rej)=>{
            fetch('http://localhost:8080/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    pass: this.state.password,
                    phoneno: this.state.phoneno
                })
            })
                .then(response => response.json(), () => {
                    console.log('Server recieved');
                    res('Thank You');
                })
                .catch(err => console.log(err));
        });

        
        
    }


    render() {
        return (
            <div>
                <div className={classes.baseContainer} ref={this.props.containerRef}>
                    <div className={classes.header}>Add Admin</div>
                    <div className={classes.content}>
                        <div>
                            <img src={loginImg} className={classes.image} />
                        </div>
                        <div className={classes.form}>
                            <div className={classes.formGroup}>
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" onChange={(e) => { this.inputHandler(e) }} value={this.state.name} placeholder="Name" />
                            </div>
                            <div className={classes.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" onChange={(e) => { this.inputHandler(e) }} value={this.state.email} placeholder="Email" />
                            </div>
                            <div className={classes.formGroup}>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" onChange={(e) => { this.inputHandler(e) }} value={this.state.password} placeholder="Password" />
                            </div>
                            <div className={classes.formGroup}>
                                <label htmlFor="phoneno">Phone-No</label>
                                <input type="phoneno" name="phoneno" onChange={(e) => { this.inputHandler(e) }} value={this.state.phoneno} placeholder="Phone-No" />
                            </div>
                            <div className={classes.formGroup}>
                                <label htmlFor="adminPassword">Admin-Password</label>
                                <input type="password" name="adminPassword" onChange={(e) => { this.inputHandler(e) }} value={this.state.adminPassword} placeholder="Admin-Password" />
                            </div>
                        </div>
                    </div>

                    <div className={classes.footer}>
                        <button onClick={this.successHandler}>
                            ADD
                        </button>
                    </div>

                </div>
            </div>
        )
    }
}

export default AdminAdd;