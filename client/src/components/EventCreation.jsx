// import { useState } from 'react';
// import "./EventCreation.css";

// // eslint-disable-next-line react/prop-types
// const EventCreation = ({ onCreate }) => {
//     const [eventDetails, setEventDetails] = useState({
//         title: '',
//         description: '',
//         date: '',
//         startTime: '',
//         startPeriod: 'AM',
//         endTime: '',
//         endPeriod: 'AM',
//         meetLink: '', 
//         maxParticipants: '',
//         skillsRequired: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEventDetails({ ...eventDetails, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (eventDetails.title && eventDetails.description && eventDetails.date) {
//             onCreate(eventDetails); // Call the parent function to handle the created event
//             setEventDetails({
//                 title: '',
//                 description: '',
//                 date: '',
//                 startTime:'',
//                 endTime:'',
//                 meetLink:'',
//                 maxParticipants:'',
//                 skillsRequired: ''
//             });
//             alert('Event Created Successfully!');
//         } else {
//             alert('Please fill all required fields.');
//         }
//     };

//     return (
        
//         <div className='container' >
//             <div className='headline'>
//                 <h2 style={{marginTop:'15px',marginBottom:'5px',fontSize:'32px'}}>Create a New Event</h2>
//                 <h3 style={{fontSize:'12px',marginBottom:'15px',color:'lightgoldenrodyellow'}}>Organize your event and inspire participants to join you!</h3>
//             </div>
//             <div className="event-creation" >
//             <form onSubmit={handleSubmit}>
//                 <div className='section'>
//                     <label htmlFor="title">Event Title :</label>
//                     <input
//                         type="text"
//                         id="title"
//                         name="title"
//                         value={eventDetails.title}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className='section'>
//                     <label  htmlFor="description">Description :</label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         value={eventDetails.description}
//                         onChange={handleChange}
//                         required
//                     ></textarea>
//                 </div>
//                 <div className='section'>
//                     <label htmlFor="date">Date :</label>
//                     <input
//                         type="date"
//                         id="date"
//                         name="date"
//                         value={eventDetails.date}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className='timings' >
//                 <div className='time-feild'>
//                     <label htmlFor="startTime">Start Time:</label>
//                     <div style={{ display: 'flex', gap: '10px' }}>
//                          <input
//                             type="time"
//                             id="startTime"
//                             name="startTime"
//                             value={eventDetails.startTime}
//                             onChange={handleChange}
//                             required
//                         />
//                          <select
//                             name="startPeriod"
//                             value={eventDetails.startPeriod}
//                             onChange={handleChange}
//                             required
//                             >
//                         <option value="AM">AM</option>
//                         <option value="PM">PM</option>
//                          </select>
//                     </div>
//                 </div>
//                 <div className='time-feild'>
//                     <label htmlFor="endTime">End Time:</label>
//                     <div style={{ display: 'flex', gap: '10px' }}>
//                         <input
//                             type="time"
//                             id="endTime"
//                             name="endTime"
//                             value={eventDetails.endTime}
//                             onChange={handleChange}
//                             required
//                          />
//                         <select
//                              name="endPeriod"
//                              value={eventDetails.endPeriod}
//                             onChange={handleChange}
//                             required
//                          >
//                         <option value="AM">AM</option>
//                         <option value="PM">PM</option>
//                     </select>
//                      </div>
//                  </div>
//                  </div>
//                  <div className='section'>
//                      <label htmlFor="maxParticipants">Maximum Participants:</label>
//                      <input
//                             type="number"
//                             id="maxParticipants"
//                             name="maxParticipants"
//                             value={eventDetails.maxParticipants}
//                             onChange={handleChange}
//                             placeholder=""
//                             min="1"
//                             option
//                      />
//                 </div>
//                 <div className='section'>
//                         <label htmlFor="meetLink">Meet Link:</label>
//                         <input
//                             type="url"
//                             id="meetLink"
//                             name="meetLink"
//                             value={eventDetails.meetLink}
//                             onChange={handleChange}
//                             placeholder="Enter meet link (e.g., Zoom, Google Meet)"
//                             option
//                         />
//                 </div>

//                 <div className='section'>
//                     <label htmlFor="skillsRequired">Skills Required :</label>
//                     <input
//                         type="text"
//                         id="skillsRequired"
//                         name="skillsRequired"
//                         value={eventDetails.skillsRequired}
//                         onChange={handleChange}
//                         placeholder="E.g., Music, Dance"
//                     />
//                 </div>
//                 <button type="submit">Create Event</button>
//             </form>
//             </div>
//         </div>
//     );
// };

// const SkillExchangeManagement = () => {
//     const [events, setEvents] = useState([]);

//     const handleEventCreation = (newEvent) => {
//         setEvents([...events, newEvent]);
//         console.log('Event Created:', newEvent);
//     };

//     return (
//         <div>
//             {/* <h1>Skill Exchange Management</h1> */}
//             <EventCreation onCreate={handleEventCreation} />
//             {/* <h2>Upcoming Events</h2> */}
//             <ul>
//                 {events.map((event, index) => (
//                     <li key={index}>
//                         {event.title} - {event.date}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default SkillExchangeManagement;


import React, { useState } from "react";
import { InputField } from "./InputField";

export function EventCreationForm() {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    startPeriod: "AM",
    endTime: "",
    endPeriod: "AM",
    meetLink: "",
    maxParticipants: "",
    skillsRequired: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Event creation logic will go here
    console.log("Event Details:", eventDetails);
    // You can add your onCreate function call here
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <img
        src="https://dovilearn.s3.eu-west-2.amazonaws.com/images/course-images/1612287896eventmanagement.jpeg"
        alt="event_bg_img"
        className="absolute z-0 opacity-75 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden relative z-10">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Create a New Event</h2>
          <p className="text-blue-100">Organize your event and inspire participants to join you!</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <InputField
            label="Event Title"
            name="title"
            type="text"
            value={eventDetails.title}
            onChange={handleInputChange}
            required
          />

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={eventDetails.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <InputField
            label="Date"
            name="date"
            type="date"
            value={eventDetails.date}
            onChange={handleInputChange}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <div className="flex">
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  className="w-full px-3 py-2 text-gray-700 border rounded-l-lg focus:outline-none focus:border-blue-500"
                  value={eventDetails.startTime}
                  onChange={handleInputChange}
                  required
                />
                <select
                  name="startPeriod"
                  className="px-3 py-2 text-gray-700 border-t border-b border-r rounded-r-lg focus:outline-none focus:border-blue-500"
                  value={eventDetails.startPeriod}
                  onChange={handleInputChange}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <div className="flex">
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  className="w-full px-3 py-2 text-gray-700 border rounded-l-lg focus:outline-none focus:border-blue-500"
                  value={eventDetails.endTime}
                  onChange={handleInputChange}
                  required
                />
                <select
                  name="endPeriod"
                  className="px-3 py-2 text-gray-700 border-t border-b border-r rounded-r-lg focus:outline-none focus:border-blue-500"
                  value={eventDetails.endPeriod}
                  onChange={handleInputChange}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>

          <InputField
            label="Maximum Participants"
            name="maxParticipants"
            type="number"
            value={eventDetails.maxParticipants}
            onChange={handleInputChange}
            min="1"
          />

          <InputField
            label="Meet Link"
            name="meetLink"
            type="url"
            value={eventDetails.meetLink}
            onChange={handleInputChange}
            placeholder="Enter meet link (e.g., Zoom, Google Meet)"
          />

          <InputField
            label="Skills Required"
            name="skillsRequired"
            type="text"
            value={eventDetails.skillsRequired}
            onChange={handleInputChange}
            placeholder="E.g., Music, Dance"
          />

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg 
                     font-semibold shadow-md hover:from-blue-700 hover:to-indigo-800 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                     transition-all duration-300"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventCreationForm;