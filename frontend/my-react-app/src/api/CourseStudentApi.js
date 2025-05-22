import axios from 'axios';

const URL = '/api/courseStudent'

export const getAllCourseStudent = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance:', error);
    throw error;
  }
};

export const insertCourseStudent = async (courseStudent) => {
    try {
        const response = await axios.post(URL, courseStudent)
        console.log("success: " + response)
         return response;
    } catch (error) {
              if (error.response) {
            console.error("Backend error:", error.response.data.error);
            throw error.response.data.error;
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Axios error:", error.message);
        }
        console.error('Error fetching attendance:', error);
        throw error;
    }
};