import React, { Component } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import eventData from '../Events/EventsData';


class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventType: ''
        };
    }

    componentWillMount() {
        const userId = window.sessionStorage.getItem("userId")
        if (userId == null) {
            window.location.href = '/login';
        } else {
            this.setState({ eventType: window.sessionStorage.getItem("bookingType") })
        }

    }

    onSubmit = (event) => {
        window.sessionStorage.setItem("checkoutData", JSON.stringify(event));
        console.log('I have clicked on the block', event.eventName);
        window.location.href = '/checkout'
    };
    render() {
        return (
            <div>
                {
                    eventData.map((event, key) => {
                        if (event.eventType == this.state.eventType) {
                            return (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', width: '60%', marginLeft: '20%', borderTop: 'solid blue', marginBlock: 30 }}>

                                    <div class='column1'>
                                        <text>{event.eventName}</text>
                                    </div>
                                    <div>
                                        <text>{event.eventType}</text>
                                    </div>
                                    <div>
                                        <Button onClick={() => this.onSubmit(event)} style={{ backgroundColor: 'goldblue', cursor: 'pointer' }}>
                                            Book Ticket
                                         </Button>
                                    </div>
                                </div>
                            );
                        }

                    })
                }
            </div>
        );
    }

}

export default Booking;
