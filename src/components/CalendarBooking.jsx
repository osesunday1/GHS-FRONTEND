import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import styled from 'styled-components';
import useFetch from './CustomHooks/useFetch';
import Modal from '../styles/Modal';



// Styled component for the calendar wrapper
const StyledCalendarWrapper = styled.div`
  .fc {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 10px;
    max-height: 700px;
    max-width: 800px;
    margin: 0 auto;

    .fc-toolbar-title {
      color: #333;
    }

    .fc-daygrid-day-number {
      color: #007bff;
    }

    .fc-daygrid-event {
      background-color: #007bff;
      border: none;
      border-radius: 4px;
      color: #ffffff;
    }

    .fc-daygrid-day {
      &.fc-day-today {
        background-color: rgba(0, 123, 255, 0.1);
      }
      
    }
  }

  @media (max-width: 768px) {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

`;

const StyledContent = styled.div`
  margin: 0 auto;
  display: grid;
  gap: 10px;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
    font-size: 16px;
  }

  strong {
    font-weight: bold;
  }
`;

const CalendarBooking = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  
  const [events, setEvents] = useState([]);
  const { data: bookings, loading, error } = useFetch(`${apiUrl}/v1/bookings`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (bookings) {
      const formattedEvents = bookings.map((booking) => ({
        title: `${booking.guest.firstName} ${booking.guest.lastName} - ${booking.apartmentName}`,
        start: booking.checkInDate,
        end: booking.checkOutDate,
        extendedProps: {
          guest: booking.guest,
          apartmentName: booking.apartmentName,
          numberOfRooms: booking.numberOfRooms,
          price: booking.price,
          amountPaid: booking.amountPaid,
          cautionFee: booking.cautionFee,
          balanceDue: booking.amountLeftToPay, // Assuming you have this calculated
        },
      }));
      setEvents(formattedEvents);
    }
  }, [bookings]);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <StyledCalendarWrapper>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        eventColor={'var(--darkgrey)'} // Set default color for events
      />

      {isModalOpen && selectedEvent && (
        <Modal onClose={closeModal} show={isModalOpen} title={`Booking Details: ${selectedEvent.title}`}>
          <StyledContent>
            <p>
              <strong>Guest Name:</strong> {selectedEvent.extendedProps.guest.firstName} {selectedEvent.extendedProps.guest.lastName}
            </p>
            <p>
              <strong>Apartment:</strong> {selectedEvent.extendedProps.apartmentName}
            </p>
            <p>
              <strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}
            </p>
            {selectedEvent.end && (
              <p>
                <strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}
              </p>
            )}
            <p>
              <strong>Number of Rooms:</strong> {selectedEvent.extendedProps.numberOfRooms}
            </p>
            <p>
              <strong>Price:</strong> #{selectedEvent.extendedProps.price.toLocaleString()}
            </p>
            <p>
              <strong>Amount Paid:</strong> #{selectedEvent.extendedProps.amountPaid.toLocaleString()}
            </p>
            <p>
              <strong>Caution Fee:</strong> #{selectedEvent.extendedProps.cautionFee.toLocaleString()}
            </p>
            <p>
              <strong>Balance Due:</strong> #{selectedEvent.extendedProps.balanceDue.toLocaleString()}
            </p>
          </StyledContent>
        </Modal>
      )}
    </StyledCalendarWrapper>
  );
};

export default CalendarBooking;