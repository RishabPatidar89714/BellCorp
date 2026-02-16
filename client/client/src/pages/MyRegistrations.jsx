import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/registrations/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRegistrations(res.data);
      } catch (err) {
        setError('Failed to load registrations. Please log in again.');
      }
    };
    fetchRegistrations();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Registrations</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {registrations.length === 0 ? (
        <p className="text-gray-600 text-center">No registrations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registrations.map((reg) => (
            <div
              key={reg.id}
              className="bg-white shadow-md rounded p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{reg.Event.name}</h3>
              <p className="text-gray-600 mb-1">
                <strong>Organizer:</strong> {reg.Event.organizer}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Location:</strong> {reg.Event.location}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Date:</strong> {new Date(reg.Event.date).toLocaleString()}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Category:</strong> {reg.Event.category}
              </p>
              <p className="text-gray-700 mt-2">{reg.Event.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Registered at: {new Date(reg.registeredAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRegistrations;