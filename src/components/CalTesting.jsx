import { useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "../styles/Modal"; // Ensure you have a Modal component styled accordingly
import styled from "styled-components";

const StyledContent =styled.div`
    margin: 0 auto;
    display: grid;
    justify-content: center;
    align-items: center;
`

function CalTesting() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const events = [
    {
      title: "Event 1",
      start: "2024-08-01T10:00:00",
      end: "2024-08-01T12:00:00",
      extendedProps: {
        venue: "Games Village"
      }
    },
    {
      title: "Event 2",
      start: "2024-08-05T13:00:00",
      end: "2024-08-10T15:00:00",
      extendedProps: {
        venue: "Conference Hall"
      }
    },
    {
      title: "Event 3",
      start: "2024-08-03T09:00:00",
      extendedProps: {
        venue: "Main Auditorium"
      }
    },
    // Add more events here
  ];

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventColor="#378006"
        height={"70vh"}
        width={"70vw"}
        eventClick={handleEventClick}
      />

      {isModalOpen && (
        <Modal onClose={closeModal} show={isModalOpen} title={selectedEvent.title}>

            <StyledContent>
          <p>
            <strong>Start:</strong> {selectedEvent.start.toLocaleString()}
          </p>
          {selectedEvent.end && (
            <p>
              <strong>End:</strong> {selectedEvent.end.toLocaleString()}
            </p>
          )}
          <p>
            <strong>Venue:</strong> {selectedEvent.extendedProps.venue}
          </p>
          </StyledContent>
        </Modal>
      )}
    </div>
  );
}

export default CalTesting;