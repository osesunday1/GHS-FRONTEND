import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import useFetch from '../CustomHooks/useFetch';
import useDelete from '../CustomHooks/useDelete';
import useUpdate from '../CustomHooks/useUpdate';
import Modal from '../../styles/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import usePost from '../CustomHooks/usePost';

const localizer = momentLocalizer(moment);



import styled from 'styled-components';

//container
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 80%;
  justify-content: center;
  align-items: center;
`;

// Styled label
const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

// Styled select (dropdown)
const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: #f9f9f9;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

// Styled input
const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: #f9f9f9;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

// Styled button
const StyledButton = styled.button`
  background-color: ${(props) => (props.delete ? 'red' : '#007bff')};
  color: white;
  border: none;
  padding: 10px 15px;
  margin-right: 10px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.delete ? '#ff4d4d' : '#0056b3')};
  }
`;

// Styled container for form elements
const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;



const TimetableList = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [trigger, setTrigger] = useState(0);
  const { data: timetables, loading, error } = useFetch(`${apiUrl}/v1/timetable`, trigger);
  const { data: users, } = useFetch(`${apiUrl}/v1/users/users`, trigger);
  const { postData} = usePost(`${apiUrl}/v1/timetable`);

  const { deleteData } = useDelete();
  const { updateData } = useUpdate();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);
  const [isCreating, setIsCreating] = useState(false); // Track if in create mode
  const [newEvent, setNewEvent] = useState({ staff: '', task: '', date: '' }); // Include staff



   

  useEffect(() => {
    if (timetables.length) {
      const formattedEvents = timetables.map((entry) => ({
        id: entry._id,
        title: `${entry.task} - ${entry.staff.name}`,
        start: new Date(entry.date),
        end: new Date(entry.date),
        allDay: true,
        task: entry.task,
        staff: entry.staff.name,
      }));
      setEvents(formattedEvents);
    }
  }, [timetables]);

  const handleCreateChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const result = await postData(newEvent);

    if(result){
        toast.success('Timetable entry created!');
    }
  };

  const handleDelete = async (id) => {
    await deleteData(`${apiUrl}/v1/timetable/${id}`);
    toast.success('Timetable entry deleted!');
    setTrigger(trigger + 1);
    setSelectedEvent(null);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setEditedEvent(event);
  };

  const handleEditChange = (e) => {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const updatedEvent = {
      task: editedEvent.task,
      date: editedEvent.start,
    };

    await updateData(`${apiUrl}/v1/timetable/${editedEvent.id}`, updatedEvent);
    toast.success('Timetable entry updated!');
    setTrigger(trigger + 1);
    setIsEditing(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <ToastContainer />
      <h1>Timetable List</h1>

      <StyledButton onClick={() => setIsCreating(true)}>Create New Entry</StyledButton>

      <div style={{ marginTop: '20px', height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectEvent={handleSelectEvent}
          selectable
          popup
        />
      </div>

      {selectedEvent && (
        <Modal show={!!selectedEvent} onClose={() => setSelectedEvent(null)} title="Event Details">
          {!isEditing ? (
            <StyledContainer>
              <p><strong>Task:</strong> {selectedEvent.task}</p>
              <p><strong>Staff:</strong> {selectedEvent.staff}</p>
              <p><strong>Date:</strong> {selectedEvent.start.toLocaleDateString()}</p>

              <FormGroup>
              <StyledButton onClick={() => setIsEditing(true)}>Edit</StyledButton>
              <StyledButton delete onClick={() => handleDelete(selectedEvent.id)}>
                Delete
              </StyledButton>
              </FormGroup>
            </StyledContainer>
          ) : (
            <StyledContainer>
              <FormGroup>
                <StyledLabel>Task</StyledLabel>
                <StyledSelect
                  name="task"
                  value={editedEvent.task}
                  onChange={handleEditChange}
                >
                  <option value="Operations">Operations</option>
                  <option value="Cleaning">Cleaning</option>
                </StyledSelect>
              </FormGroup>

              <FormGroup>
                <StyledLabel>Date</StyledLabel>
                <StyledInput
                  type="date"
                  name="start"
                  value={moment(editedEvent.start).format('YYYY-MM-DD')}
                  onChange={handleEditChange}
                />
              </FormGroup>


              <StyledButton onClick={handleSave}>Save</StyledButton>


            </StyledContainer>
          )}
        </Modal>
      )}


{isCreating && (
   <Modal show={isCreating} onClose={() => setIsCreating(false)} title="Create New Entry">
   <StyledContainer>
     <form onSubmit={handleCreate}>  {/* Use form element here */}
       <FormGroup>
         <StyledLabel>Staff</StyledLabel>
         <StyledSelect
           name="staff"
           value={newEvent.staff}
           onChange={handleCreateChange}
           required
         >
           <option value="">Select Staff</option>
           {users.map((user) => (
             <option key={user._id} value={user._id}>
               {user.name}
             </option>
           ))}
         </StyledSelect>
       </FormGroup>
 
       <FormGroup>
         <StyledLabel>Select Task</StyledLabel>
         <StyledSelect
           name="task"
           value={newEvent.task}
           onChange={handleCreateChange}
           required
         >
           <option value="">Select Task</option>
           <option value="Operations">Operations</option>
           <option value="Cleaning">Cleaning</option>
         </StyledSelect>
       </FormGroup>
 
       <FormGroup>
         <StyledLabel>Date</StyledLabel>
         <StyledInput
           type="date"
           name="date"
           value={newEvent.date}
           onChange={handleCreateChange}
           required
         />
       </FormGroup>
 
       <StyledButton type="submit">Create</StyledButton> {/* Use type="submit" */}
     </form>
   </StyledContainer>
 </Modal>
  )}
    </div>
  );




  

};

export default TimetableList;