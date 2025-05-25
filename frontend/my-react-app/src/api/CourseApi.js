import axios from "axios";

export const getAllCourse = async (id) => {
  try {
    const response = await axios.get("/api/course");
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance:", error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete("/api/course");
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};
