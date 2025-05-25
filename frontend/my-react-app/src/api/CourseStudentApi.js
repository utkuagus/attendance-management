import axios from "axios";

const URL = "/api/courseStudent";

export const getAllCourseStudent = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance:", error);
    throw error;
  }
};

export const insertCourseStudent = async (courseStudent) => {
  try {
    const response = await axios.post(URL, courseStudent);
    console.log("success: " + response);
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
    console.error("Error fetching attendance:", error);
    throw error;
  }
};

export const deleteCourseStudent = async (id) => {
  try {
    const response = await axios.delete(`${URL}/${id}`);
    console.log("Delete successful:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "Backend error:",
        error.response.data?.error || error.response.data
      );
      throw error.response.data?.error || "Unexpected server error.";
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw "No response from server.";
    } else {
      console.error("Axios setup error:", error.message);
      throw "Something went wrong with the request.";
    }
  }
};
