import React, { Component } from 'react';
import { Button, Form, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import BookingRequest from './BookingRequest'

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {},
            userId: '',
            date: '',
            timeslot: '',
            ticketCount: 1,
            response: {},
            startDate: '',
            endDate: ''
        };

    }

    componentWillMount() {
        const userId = window.sessionStorage.getItem("userId");
        if (userId == null) {
            window.location.href = '/login';
        } else {
            this.setState({
                event: JSON.parse(window.sessionStorage.getItem("checkoutData")),
                userId: userId
            })
            console.log('logging events')
            var today = new Date();
            let month = today.toLocaleString('en-us', { month: 'long' });
            var newDate = new Date();
            newDate.setDate(today.getDate() + 10);
            var newMonth = newDate.toLocaleString('en-us', { month: 'long' });
            var startDate = today.getDate() + '-' + month;
            var endDate = newDate.getDate() + '-' + newMonth;
            this.setState({ startDate: startDate, endDate: endDate });
        }

    }

    validateDate = (date1) => {
        console.log('Selected date is:', date1);
        this.setState({ date: date1 })
        var date = new Date(date1);
        var startDate = new Date(this.state.startDate);
        startDate.setFullYear(date.getFullYear());
        var endDate1 = new Date(this.state.endDate);
        var endDate =  new Date(this.state.endDate);
        endDate.setDate(endDate1.getDate()+1);
        endDate.setFullYear(date.getFullYear());
        if (date < startDate || date > endDate) {
            let month = startDate.toLocaleString('en-us', { month: 'long' });
            var newMonth = endDate.toLocaleString('en-us', { month: 'long' });
            var startDate1 = startDate.getDate() + '-' + month;
            var endDate1 = endDate.getDate() + '-' + newMonth;
            alert(`Please select date between ${startDate1} and ${endDate1}`);
            this.setState({ date: '' });
            return false;
        }else{
            return true;
        }
    }

    async confirmBooking() {
        const userId = this.state.userId;
        console.log('Checkout Success', this.state.ticketCount, this.state.date, this.state.timeslot, userId);
        if (this.state.date === '' || this.state.timeslot === '') {
            alert('Please select date and timeslot');
        } else if(this.validateDate(this.state.date)){
            this.prepareData();
            console.log('BookingRequest', BookingRequest)
            var serverError = true;
            const url = `http://localhost:8080/booking/book/${userId}`;
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(BookingRequest)
            };
            await fetch(url, requestOptions)
                .then(response => response.json())
                .then(data => {
                    serverError = false;
                    this.setState({ response: data })
                })
                .catch(function (error) {
                    console.log(error);
                    alert(`Login Failed: Internal server error`)
                    serverError = true;
                });
            if (!serverError) {
                const respData = this.state.response;
                alert(respData.data);
                if (respData.code == 200) {
                    window.location.href = '/myBookings'
                }
            }
        }

    }

    prepareData = () => {
        const event = this.state.event;
        BookingRequest.userId = this.state.userId;
        BookingRequest.eventName = event.eventName;
        BookingRequest.eventType = event.eventType;
        BookingRequest.eventPrice = event.eventPrice;
        BookingRequest.timeSlot = this.state.timeslot;
        BookingRequest.location = event.location;
        BookingRequest.eventImg = event.eventImg;
        BookingRequest.eventDate = this.state.date;
        BookingRequest.ticketCount = this.state.ticketCount;
    }


    render() {
        const event = this.state.event;
        var startDate = this.state.startDate;
        var endDate = this.state.endDate;
        var num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        return (
            <div style={{ width: '50%', marginLeft: '25%', marginTop: 10, textAlign: 'center' }}>
                <h1 style={{ textAlign: 'center' }}>Book Ticket</h1>
                <div style={{ textAlign: 'center', border: 'solid', marginBottom: 20 }}>
                    <img style={{ height: '6cm', width: '6cm', marginTop: 10 }} src={event.eventImg} />
                    <h1 style={{ fontStyle: 'bold', color: 'goldenrod' }}>{event.eventName}</h1>
                    <p>{startDate} To {endDate} &nbsp; {event.location}|{event.eventPrice} Onwards</p>
                    <div>
                        <h5 style={{ textAlign: 'left', border: 'solid', backgroundColor: 'lightgray' }}>Select Date</h5>
                        <div style={{ marginLeft: 10, height: '2cm', marginTop: '5%' }}>
                            <Form.Group controlId="dob" style={{ width: '30%', marginLeft: 10, height: '2cm' }} onChange={e => this.setState({date:e.target.value})}>
                                <Form.Control type="date" name="dob" value={this.state.date} placeholder="Booking Date" style={{ border: 'solid' }} />
                            </Form.Group>
                        </div>
                    </div>
                    <div>
                        <h5 style={{ textAlign: 'left', border: 'solid', backgroundColor: 'lightgray' }}>Select Time</h5>
                        <div style={{ textAlign: 'left', marginLeft: 10, height: '2cm', marginTop: '5%' }}>
                            <ButtonGroup className="mr-3" aria-label="Time Slots" onClick={(e) => this.setState({ timeslot: e.target.attributes.getNamedItem('data-key').value })}>
                                {event.timeSlots.map(function (timeslot) {
                                    return (
                                        <><Button data-key={timeslot} style={{ alignSelf: 'left' }}>{timeslot}</Button>&nbsp;&nbsp;</>
                                    )
                                })}
                            </ButtonGroup>
                        </div>
                    </div>
                    <div style={{ borderTop: 'solid', height: '2cm' }}>
                        <p style={{ textAlign: 'left', marginTop: '5%', marginLeft: 20 }}>
                            <text style={{ color: 'darkcyan', fontStyle: 'bold', fontSize: 'large' }}> Tickets: &nbsp;</text>
                            <select name="select" value={this.state.ticketCount} onChange={(e) => this.setState({ ticketCount: e.target.value })}>
                                {num.map(function (n) {
                                    return (<option value={n} selected={() => this.state.selected === n}>{n}</option>);
                                })}
                            </select>
                        </p>
                    </div>

                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', marginTop: '5%', marginBottom: '5%' }}>
                    <Button placeholder='submit' style={{ width: '25%', background: 'green', marginBottom: '1%', marginLeft: '70%', cursor: 'pointer' }} onClick={() => this.confirmBooking()}>Confirm</Button>
                    <Button placeholder='submit' style={{ width: '25%', background: 'red', marginBottom: '1%', marginLeft: '10%', cursor: 'pointer' }} onClick={() => window.location.href = '/home'}>Cancel</Button>
                </div>
            </div>
        );
    }

}

export default Checkout;
