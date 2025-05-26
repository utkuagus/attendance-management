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
    console.error("Error creating course:", error);
    throw error;
  }
};
