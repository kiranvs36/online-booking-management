import React, { Component } from 'react';
import { Navbar, FormControl, Form, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import Event from '../Events/Event.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import background from '../Events/EventsImages/background.jpg';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            location: 'Location'
        };
    }

    async componentWillMount() {
        const userId = window.sessionStorage.getItem("userId")
        if (userId == null) {
            window.location.href = '/login';
        }
    }

    render() {

        return (
            <div>
                <Navbar bg='primary' variant='dark' style={{ marginTop: '0' }} >
                    <Form >
                        <FormControl type='text' placeholder='Search for Event, Play, Activities' className='mr-sm-2'
                            onChange={e => this.setState({ search: e.target.value })}
                            style={{ backgroundColor: 'whitesmoke', width: '20cm', height: 40, marginLeft: '35%' }} />

                        <div style={{ position: 'absolute', top: '15%', right: 0, marginRight: 60 }}>
                            <DropdownButton id="dropdown-basic-button" placeholder='Location' style={{ cursor: 'poiter' }} title={this.state.location} as={ButtonGroup} onSelect={(event) => this.setState({ location: event })}>
                                <Dropdown.Item eventKey='Location'>All</Dropdown.Item>
                                <Dropdown.Item eventKey='Bengaluru'>Bengaluru</Dropdown.Item>
                                <Dropdown.Item eventKey='Mumbai'>Mumbai</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </Form>
                </Navbar>

                <div>
                    <Event searchFilter={this.state.search} location={this.state.location} />
                </div>

            </div>
        );
    }

}

export default Layout;
