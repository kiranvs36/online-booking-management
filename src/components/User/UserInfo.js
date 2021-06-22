import React, { Component } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: Number,
            address: '',
            userInfo: {},
            userId: '',
            isFormValid: false,
            isFormChanged: false
        };
    }

    async componentWillMount() {
        const userId = window.sessionStorage.getItem("userId");
        if (userId == null) {
            window.location.href = '/login';
        } else {
            this.setState({ userId: userId });
            var serverError = true;
            const url = `http://localhost:8080/booking/myInfo/${userId}`;
            await fetch(url)
                .then(response => response.json())
                .then(json => {
                    serverError = false;
                    this.setState({ userInfo: json });
                })
                .catch(function (error) {
                    console.log(error);
                    serverError = true;
                    alert(`Failed to get userInfo: Internal server error`)
                });
            const userInfo = this.state.userInfo;
            if (!serverError) {
                if (userInfo.code == 200) {
                    console.log('userInfo data', userInfo.data);
                    const data = userInfo.data;
                    this.setState({ name: data.name, email: data.email, phone: data.phone, address: data.address });
                    if(this.state.name === '' || this.state.email === '' || this.state.phone === ''){
                        this.setState({isFormValid: false, isFormChanged: false});
                    }else{
                        this.setState({isFormValid: true});
                    }
                } else {
                    alert(userInfo.data);
                }
            }
        }

    }

    async onSubmit() {
        if (this.state.name === '' || this.state.email === '' || this.state.phone == 0) {
            alert(`Please fill in all mandatory fields`)
            this.setState({isFormValid: false});
        } else {
            const password = window.sessionStorage.getItem("password");
            var userInfo = {
                userId: this.state.userId,
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address,
                password: password
            }
            const userId = userInfo.userId;
            const url = `http://localhost:8080/booking/updateUserInfo/${userId}`;
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo)
            };
            await fetch(url, requestOptions)
                .then(response => response.json())
                .then(json => {
                    alert(json.data)
                    this.setState({isFormValid: true, isFormChanged: false});
                })
                .catch(function (error) {
                    console.log(error);
                    alert(`Failed to update userInfo: Internal server error`)
                });
        }
    };

    formChanged(){
        this.setState({isFormChanged: true, isFormValid: true});
    }
    render() {
        return (
            <div onChange={() => this.formChanged()} style={{ marginTop: '1%' }}>
                <Form style={{ borderStyle: 'solid', width: '50%', marginLeft: '25%', marginBottom: '5%' }}>
                    <h1 style={{ background: 'lightseagreen', textAlign: 'left', marginTop: '0' }}>
                        Profile Detail
                    </h1>
                    <br />
                    <Form.Group as={Row} controlId="formPlaintext" style={{ marginLeft: '1cm' }} onChange={e => this.setState({ name: e.target.value })}>
                        <Form.Label column sm="2" >Name</Form.Label>
                        <Col sm="10">
                            <Form.Control type='text' value={this.state.name} style={{ width: '10cm' }}
                                isInvalid={this.state.name === ''} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail" style={{ marginLeft: '1cm' }} controlId='formBasicEmail' onChange={e => this.setState({ email: e.target.value })}>
                        <Form.Label column sm="2">Email</Form.Label>
                        <Col sm="10">
                            <Form.Control type='email' value={this.state.email} style={{ width: '10cm' }}
                                isInvalid={this.state.email === ''} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail" style={{ marginLeft: '1cm' }} controlId='phone' onChange={e => this.setState({ phone: e.target.value })} required isInvalid>
                        <Form.Label column sm="2">Mobile Number</Form.Label>
                        <Col sm="10">
                            <Form.Control type='phone' value={this.state.phone} style={{ width: '10cm' }}
                                isInvalid={this.state.phone === '' || this.state.phone === Number} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail" style={{ marginLeft: '1cm' }} onChange={e => this.setState({ address: e.target.value })}>
                        <Form.Label column sm="2">Address</Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" value={this.state.address} style={{ width: '10cm' }} />
                        </Col>
                    </Form.Group>

                    <Button placeholder='submit' style={{ marginTop: '20px', background: 'lightseagreen', marginLeft: '43%', marginBottom: '1%', cursor: 'pointer' }} disabled={!this.state.isFormValid || !this.state.isFormChanged} onClick={() => this.onSubmit()}>Submit</Button>
                </Form>
            </div>
        );
    }

}

export default UserInfo;
