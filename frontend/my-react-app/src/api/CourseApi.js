import axios from "axios";

const URL = "/api/course";

export const getAllCourse = async (id) => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance:", error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete(URL + "/" + id);
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

export const createCourse = async (course) => {
  try {
    const response = await axios.post(URL, course);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Backend error:", error.response.data.error);
      throw error.response.data.error;
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Axios error:", error.message);
    }
    console.error("Error fetching attendance:", error);
    throw error;
  }
};
