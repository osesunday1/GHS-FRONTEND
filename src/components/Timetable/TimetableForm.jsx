import { useState } from 'react';
import styled from 'styled-components';
import usePost from '../CustomHooks/usePost';
import useUpdate from '../CustomHooks/useUpdate';
import { ToastContainer, toast } from 'react-toastify';

const FormContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TimetableForm = ({ timetable, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(timetable || {});
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const { postData } = usePost();
  const { updateData } = useUpdate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (timetable._id) {
      await updateData(`${apiUrl}/v1/timetables/${timetable._id}`, formData);
      toast.success('Timetable updated!');
    } else {
      await postData(`${apiUrl}/v1/timetables`, formData);
      toast.success('Timetable created!');
    }
    onUpdate();
    onClose();
  };

  return (
    <FormContainer>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <label>Staff ID</label>
        <input
          type="text"
          name="staff"
          value={formData.staff || ''}
          onChange={handleChange}
          required
        />
        <label>Task</label>
        <input
          type="text"
          name="task"
          value={formData.task || ''}
          onChange={handleChange}
          required
        />
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date ? formData.date.split('T')[0] : ''}
          onChange={handleChange}
          required
        />
        <button type="submit">Save</button>
      </form>
    </FormContainer>
  );
};

export default TimetableForm;