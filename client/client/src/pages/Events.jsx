import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data);
      } catch (err) {
        setError('Failed to load events');
      }
    };
    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to register.');
        return;
      }
      await axios.post(
        'http://localhost:5000/api/registrations',
        { eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Successfully registered for the event!');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Available Events</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-md rounded p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
            <p className="text-gray-600 mb-1">
              <strong>Organizer:</strong> {event.organizer}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Location:</strong> {event.location}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Date:</strong> {new Date(event.date).toLocaleString()}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Category:</strong> {event.category}
            </p>
            <p className="text-gray-700 mt-2">{event.description}</p>
            <button
              onClick={() => handleRegister(event.id)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;