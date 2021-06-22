import React, { Component } from 'react';
import { Card } from 'react-bootstrap';


class MyBookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            userId: ''
        };
    }

    async componentWillMount() {
        const userId = window.sessionStorage.getItem("userId")
        if (userId == null) {
            window.location.href = '/login';
        } else {
            this.setState({ userId: userId })
            const url = `http://localhost:8080/booking/myBookings/${userId}`;
            await fetch(url)
                .then(response => response.json())
                .then(json => {
                    this.setState({ bookings: json.data });
                })
                .catch(function (error) {
                    console.log(error);
                    alert(`Failed to get Booking Info: Internal server error`)
                });
        }

    }
    render() {
        const myBookings = this.state.bookings;
        if (myBookings.length > 0) {
            return (
                <div>
                    <h1 style={{textAlign:'center'}}>My Bookings</h1>
                    {
                        myBookings.map((event, key) => {
                            return (
                                <Card style={{ backgroundColor: 'lightblue', marginLeft: 50, width: '90%', borderTop: 'solid blue', marginTop: 20 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBlock: 30 }}>

                                        <div>
                                            <text style={{ color: 'blue' }}>Name: </text>{event.eventName}
                                        </div>
                                        <div >
                                            <text style={{ color: 'blue' }}>Type: </text>{event.eventType}
                                        </div>
                                        <div>
                                            <text style={{ color: 'blue' }}>Price: </text>{event.eventPrice} Rs
                                        </div>
                                        <div>
                                            <text style={{ color: 'blue' }}>Location: </text> {event.location}
                                        </div>
                                        <div>
                                            <text style={{ color: 'blue' }}>Date: </text> {event.eventDate}
                                        </div>
                                        <div>
                                            <text style={{ color: 'blue' }}>Time: </text>{event.timeSlot}
                                        </div>
                                        <div>
                                            <text style={{ color: 'blue' }}>Tickets: </text> {event.ticketCount}
                                        </div>
                                    </div>
                                </Card>
                            );
                        })
                    }
                </div>
            );
        } else {
            return (
                <h1 style={{ textAlign: 'Center', color: 'red', marginTop: '10%' }}> No Record Found </h1>
            );
        }

    }

}

export default MyBookings;
