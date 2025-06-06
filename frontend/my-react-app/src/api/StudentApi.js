import axios from 'axios';

export const getAllStudents = async () => {
  try {
    const response = await axios.get('/api/student');
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance:', error);
    throw error;
  }
};