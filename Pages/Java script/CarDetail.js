import React, { useState, useEffect } from 'react';
import './CarDetail.css';

const CarDetail = ({ appointmentId }) => {
    const [carDetail, setCarDetail] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const statusFlow = ['Car Received', 'Service Ongoing', 'Checking End Status', 'Complete'];

    const fetchCarDetail = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost/car_service_centre/get_appointments.php?appointmentId=${appointmentId}`, {
                method: 'GET',
                credentials: 'include', // Ensure credentials are included for session
            });
            
            const data = await response.json();
            console.log('Response from PHP:', data); // Log the response

            if (data.success) {
                const foundAppointment = data.appointments[0]; // Access the first item
                console.log('Found appointment:', foundAppointment);
                setCarDetail(foundAppointment || null);
            } else {
                setErrorMessage(data.message); // Handle error messages
            }
        } catch (error) {
            console.error('Error fetching car details:', error);
            setErrorMessage('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCarDetail();
    }, [appointmentId]);

    const renderStatusMeter = (currentStatus) => {
        const currentStatusIndex = statusFlow.indexOf(currentStatus);

        return (
            <div className="status-meter">
                {statusFlow.map((status, index) => (
                    <div key={index} className={`status-step ${index <= currentStatusIndex ? 'active' : ''}`}>
                        <span>{status}</span>
                    </div>
                ))}
            </div>
        );
    };

    if (loading) {
        return <p>Loading car details...</p>;
    }
    
    if (errorMessage) {
        return <p className="error-message">{errorMessage}</p>;
    }
    
    // Check if carDetail is an object with keys
    if (!carDetail || Object.keys(carDetail).length === 0) {
        return <p>No car details available.</p>;
    }

    return (
        <div className="car-detail-container">
            <h1>Car Detail</h1>
            <div className="car-info">
                <p><strong>Company:</strong> {carDetail.company_name}</p>
                <p><strong>Model:</strong> {carDetail.model}</p>
                <p><strong>Variant:</strong> {carDetail.variant}</p>
                <p><strong>Color:</strong> {carDetail.color}</p>
                <p><strong>KMs Driven:</strong> {carDetail.kilometers_driven}</p>
                <p><strong>Last Serviced KMs:</strong> {carDetail.last_serviced_km}</p>
                <p><strong>Fuel Type:</strong> {carDetail.fuel_type}</p>
                <p><strong>Booking Slot:</strong> {new Date(carDetail.booking_slot).toLocaleString()}</p>
                <p><strong>Current Status:</strong> {carDetail.status}</p>
            </div>
            <h2>Service Status</h2>
            {renderStatusMeter(carDetail.status)}
        </div>
    );
};

export default CarDetail;
