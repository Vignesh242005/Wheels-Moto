import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

    // Define the correct status flow order
    const statusFlow = ['Car Received', 'Service Ongoing', 'Checking End Status', 'Complete'];

    // Fetch Appointments (Same logic as before)
    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost/car_service_centre/get_appointments.php', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();

            if (data.success) {
                setAppointments(data.appointments);
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setErrorMessage('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Function to move to the next status based on the current status
    const moveToNextStatus = async (id, currentStatus) => {
        // Find the index of the current status in the flow
        const currentStatusIndex = statusFlow.indexOf(currentStatus);

        // Determine the next status in the flow
        const nextStatus = statusFlow[currentStatusIndex + 1];

        // If there is no next status, return (completed)
        if (!nextStatus) {
            setErrorMessage('This appointment has already been completed.');
            return;
        }

        // Call the backend to update the status
        try {
            const response = await fetch('http://localhost/car_service_centre/update_status.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id, status: nextStatus }),
            });

            const data = await response.json();

            if (data.success) {
                // Update the appointment status locally
                setAppointments(appointments.map((appointment) =>
                    appointment.id === id ? { ...appointment, status: nextStatus } : appointment
                ));
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            setErrorMessage('Failed to update the status. Please try again.');
        }
    };

    // Delete Appointment function (same as before)
    const deleteAppointment = async (id) => {
        try {
            const response = await fetch('http://localhost/car_service_centre/delete_appointment.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ id }),
            });

            const data = await response.json();

            if (data.success) {
                setAppointments(appointments.filter((appointment) => appointment.id !== id));
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error deleting appointment:', error);
            setErrorMessage('Failed to delete the appointment. Please try again.');
        }
    };

    // Fetch appointments on component load
    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div className="admin-dashboard-container">
            <h1>Admin Dashboard</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {loading ? (
                <p>Loading appointments...</p>
            ) : appointments.length === 0 ? (
                <p>No appointments booked.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Company Name</th>
                            <th>Color</th>
                            <th>KMs Driven</th>
                            <th>Last Serviced KMs</th>
                            <th>Model</th>
                            <th>Variant</th>
                            <th>Fuel Type</th>
                            <th>Booking Slot</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.user_id}</td>
                                <td>{appointment.company_name}</td>
                                <td>{appointment.color}</td>
                                <td>{appointment.kilometers_driven}</td>
                                <td>{appointment.last_serviced_km}</td>
                                <td>{appointment.model}</td>
                                <td>{appointment.variant}</td>
                                <td>{appointment.fuel_type}</td>
                                <td>{new Date(appointment.booking_slot).toLocaleString()}</td>
                                <td>{appointment.status}</td>
                                <td>
                                    {/* Move to Next button */}
                                    <button
                                        onClick={() => moveToNextStatus(appointment.id, appointment.status)}
                                        disabled={appointment.status === 'Complete'} // Disable if status is complete
                                    >
                                        {appointment.status === 'Complete' ? 'Completed' : 'Move to Next'}
                                    </button>
                                    <button onClick={() => deleteAppointment(appointment.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;