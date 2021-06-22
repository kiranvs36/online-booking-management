import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import eventData from './EventsData';
import 'bootstrap/dist/css/bootstrap.min.css'



class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            todo: {}
        };
    }

    componentWillMount() {
        console.log('componentWillMount for Events')
    }

    onSubmit = (event) => {
        window.sessionStorage.setItem("bookingType", event.eventType);
        console.log('I have clicked on the block', event.eventType);
        window.location.href = '/booking'
    };
    render() {
        var searchFilter = this.props.searchFilter;
        var location = this.props.location;
        var today = new Date();
        let longMonth = today.toLocaleString('en-us', { month: 'long' });
        var date = today.getDate() + '-' + longMonth;

        return (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", width: '50%', marginBlock: 10, marginLeft: '30%' }}>
                {
                    eventData.map((event, key) => {
                        if ((searchFilter === "" || event.eventType.toLowerCase().includes(searchFilter.toLowerCase())) && (location === 'Location' || location === event.location)) {
                            return (
                                <Card onClick={() => this.onSubmit(event)} style={{
                                    cursor: 'pointer', width: '6cm', marginBlock: 5, backgroundColor: 'lightyellow'
                                }} >
                                    <div style={{ cursor: 'pointer' }}>
                                        <img style={{ height: '8cm', width: '6cm' }} src={event.eventImg} />
                                        <p style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{event.eventName}</p>
                                        <p style={{ fontStyle: 'italic', marginBlock: 0 }}>Location: {event.location}</p>
                                        <p style={{ color: 'red', fontWeight: 'bold', marginBlock: 0 }}> Rs. {event.eventPrice} Onwards</p>
                                        <p style={{ color: 'blue', fontSize: 'large' }}>From {date}</p>
                                    </div>
                                </Card>
                            );
                        }

                    })
                }
            </div>
        );
    }

}

export default Event;
