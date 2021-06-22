import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            response: {}
        };

    }

    async login() {
        if (this.state.username === '' || this.state.password === '') {
            alert('UserName or Password cannot be empty')
        } else {
            const username = this.state.username;
            const password = this.state.password;
            var serverError = true;
            const url = `http://localhost:8080/booking/login/${username}/${password}`
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.setState({ response: data })
                    serverError = false;
                })
                .catch(function (error) {
                    console.log(error);
                    alert(`Login Failed: Internal server error`)
                    serverError = true;
                });
            const respData = this.state.response;
            if (!serverError) {
                if (respData.code == 200) {
                    console.log('Login success');
                    window.sessionStorage.setItem("userId", username);
                    window.sessionStorage.setItem("password", password);
                    window.location.href = '/home'
                } else {
                    alert(`Login Failed: ${respData.data}`)
                }
            }
        }

    };

    async signup() {
        if (this.state.username === "" || this.state.password === "") {
            alert("UserName or Password cannot be empty")
        } else {
            const username = this.state.username;
            const password = this.state.password;
            const url = `http://localhost:8080/booking/registerUser/${username}/${password}`
            await fetch(url, { method: 'POST' })
                .then(response => response.json())
                .then(data => this.setState({ response: data }));
            const respData = this.state.response;
            if (respData.code == 200) {
                window.sessionStorage.setItem("userId", username);
                window.sessionStorage.setItem("password", password);
                console.log('Login success');
                window.location.href = '/home'
            } else {
                alert(`Login Failed: ${respData.data}`);
            }
        }
    };
    render() {

        return (
            <div>
                <Form style={{ backgroundColor: 'lightsteelblue', borderStyle: 'solid', width: '50%', marginLeft: '25%', marginTop: '5%' }}>
                    <h1 style={{ textAlign: 'center', marginTop: '10', font: 'Georgia' }}>
                        Sign In
                    </h1>
                    <br />
                    <Form.Group controlId='formPlaintextEmail' style={{ marginLeft: '20%' }} onChange={e => this.setState({ username: e.target.value })}>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type='text' placeholder='User Name' style={{ width: '10cm' }} />
                    </Form.Group>

                    <Form.Group controlId='formBasicPassword' style={{ marginLeft: '20%' }} onChange={e => this.setState({ password: e.target.value })}>
                        <Form.Label >Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' style={{ width: '10cm' }} />
                    </Form.Group>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', marginTop: '10%', marginBottom: '5%' }}>
                        <Button placeholder='submit' style={{ width: '25%', background: 'golden', marginBottom: '1%', marginLeft: '60%', cursor: 'pointer' }} onClick={() => this.login()}>Login</Button>
                        <Button placeholder='submit' style={{ width: '25%', background: 'golden', marginBottom: '1%', marginLeft: '10%', cursor: 'pointer' }} onClick={() => this.signup()}>SignUp</Button>
                    </div>
                </Form>

            </div>
        );
    }

}

export default Login;
