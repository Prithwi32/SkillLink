import { useState } from 'react';
import "./EventCreation.css";

// eslint-disable-next-line react/prop-types
const EventCreation = ({ onCreate }) => {
    const [eventDetails, setEventDetails] = useState({
        title: '',
        description: '',
        date: '',
        startTime: '',
        startPeriod: 'AM',
        endTime: '',
        endPeriod: 'AM',
        meetLink: '', 
        maxParticipants: '',
        skillsRequired: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails({ ...eventDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (eventDetails.title && eventDetails.description && eventDetails.date) {
            onCreate(eventDetails); // Call the parent function to handle the created event
            setEventDetails({
                title: '',
                description: '',
                date: '',
                startTime:'',
                endTime:'',
                meetLink:'',
                maxParticipants:'',
                skillsRequired: ''
            });
            alert('Event Created Successfully!');
        } else {
            alert('Please fill all required fields.');
        }
    };

    return (
        
        <div className='container' >
            <div className='headline'>
                <h2 style={{marginTop:'15px',marginBottom:'5px',fontSize:'32px'}}>Create a New Event</h2>
                <h3 style={{fontSize:'12px',marginBottom:'15px',color:'lightgoldenrodyellow'}}>Organize your event and inspire participants to join you!</h3>
            </div>
            <div className="event-creation" >
            <form onSubmit={handleSubmit}>
                <div className='section'>
                    <label htmlFor="title">Event Title :</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={eventDetails.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='section'>
                    <label  htmlFor="description">Description :</label>
                    <textarea
                        id="description"
                        name="description"
                        value={eventDetails.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className='section'>
                    <label htmlFor="date">Date :</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={eventDetails.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='timings' >
                <div className='time-feild'>
                    <label htmlFor="startTime">Start Time:</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                         <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            value={eventDetails.startTime}
                            onChange={handleChange}
                            required
                        />
                         <select
                            name="startPeriod"
                            value={eventDetails.startPeriod}
                            onChange={handleChange}
                            required
                            >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                         </select>
                    </div>
                </div>
                <div className='time-feild'>
                    <label htmlFor="endTime">End Time:</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="time"
                            id="endTime"
                            name="endTime"
                            value={eventDetails.endTime}
                            onChange={handleChange}
                            required
                         />
                        <select
                             name="endPeriod"
                             value={eventDetails.endPeriod}
                            onChange={handleChange}
                            required
                         >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                     </div>
                 </div>
                 </div>
                 <div className='section'>
                     <label htmlFor="maxParticipants">Maximum Participants:</label>
                     <input
                            type="number"
                            id="maxParticipants"
                            name="maxParticipants"
                            value={eventDetails.maxParticipants}
                            onChange={handleChange}
                            placeholder=""
                            min="1"
                            option
                     />
                </div>
                <div className='section'>
                        <label htmlFor="meetLink">Meet Link:</label>
                        <input
                            type="url"
                            id="meetLink"
                            name="meetLink"
                            value={eventDetails.meetLink}
                            onChange={handleChange}
                            placeholder="Enter meet link (e.g., Zoom, Google Meet)"
                            option
                        />
                </div>

                <div className='section'>
                    <label htmlFor="skillsRequired">Skills Required :</label>
                    <input
                        type="text"
                        id="skillsRequired"
                        name="skillsRequired"
                        value={eventDetails.skillsRequired}
                        onChange={handleChange}
                        placeholder="E.g., Music, Dance"
                    />
                </div>
                <button type="submit">Create Event</button>
            </form>
            </div>
        </div>
    );
};

const SkillExchangeManagement = () => {
    const [events, setEvents] = useState([]);

    const handleEventCreation = (newEvent) => {
        setEvents([...events, newEvent]);
        console.log('Event Created:', newEvent);
    };

    return (
        <div>
            {/* <h1>Skill Exchange Management</h1> */}
            <EventCreation onCreate={handleEventCreation} />
            {/* <h2>Upcoming Events</h2> */}
            <ul>
                {events.map((event, index) => (
                    <li key={index}>
                        {event.title} - {event.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SkillExchangeManagement;


