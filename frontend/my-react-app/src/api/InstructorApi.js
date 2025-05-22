import axios from 'axios';

export const getAllInstructors = async () => {
  try {
    const response = await axios.get('/api/instructor');
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance:', error);
    throw error;
  }
};