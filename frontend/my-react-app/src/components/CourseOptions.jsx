import { useEffect, useState } from "react";
import { getAllCourse, deleteCourse } from "../api/CourseApi";
import {
  insertCourseStudent,
  deleteCourseStudent,
} from "../api/CourseStudentApi";
import { getDayList } from "../utils/DayList.JSX";

function CourseOptions(props) {
  const [courseList, setCourseList] = useState([]);
  const [studentCourseList, setStudentCourseList] = useState([]);
  const DAY_LIST = getDayList();
  const person = props.personId;

  const title = props.isStudent ? "available courses" : "current courses";

  const getAll = (instructorId) =>
    props.isStudent
      ? courseStudentListToCourseList()
      : getCoursesByInstructorId(instructorId);

  async function getCoursesByInstructorId(instructorId) {
    let filteredResp;
    console.log("inner func entered");
    try {
      const resp = await getAllCourse();
      filteredResp = resp.filter(
        (course) => course.instructorId == instructorId
      );
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
    console.log("filteredResp ", filteredResp);
    return filteredResp;
  }

  useEffect(() => {
    async function fetchCourses() {
      try {
        console.log("Entering into get all");
        const resp = await getAll(person);
        console.log("person " + person);
        setCourseList(resp);
        console.log(resp);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    }

    if (!person || !props.courseStudentByStudentId) {
      return;
    }
    console.log("checking person id", person);
    fetchCourses();
  }, [props.courseStudentByStudentId]);

  function handleAddCourseStudent(courseStudent, idx) {
    if (!props.isStudent) {
      return;
    }
    insertCourseStudent(courseStudent)
      .then((_) => props.setCourseStudentTrigger((cst) => !cst))
      .catch((e) => {
        const errorDivs = document.querySelectorAll(".error");
        errorDivs.forEach((div) => (div.innerText = ""));
        errorDivs[idx].innerText = "* " + e;
      });
  }

  const handleDelete = props.isStudent
    ? handleDeleteCourseStudent
    : handleDeleteCourse;

  async function handleDeleteCourse(courseId, idx) {
    console.log("courseId", courseId);
    deleteCourse(courseId)
      .then((_) => props.setCourseStudentTrigger((cst) => !cst))
      .catch((e) => {
        const errorDivs = document.querySelectorAll(".error");
        errorDivs.forEach((div) => (div.innerText = ""));
        errorDivs[idx].innerText = "* " + e;
      });
  }

  async function handleDeleteCourseStudent(courseId, idx) {
    if (!props.isStudent) {
      return;
    }
    const courseStudent = props.courseStudentByStudentId.find(
      (cs) => cs.courseId == courseId
    );
    console.log("coursestudentbyid", props.courseStudentByStudentId);
    console.log("courseId", courseId);
    deleteCourseStudent(courseStudent.id)
      .then((_) => props.setCourseStudentTrigger((cst) => !cst))
      .catch((e) => {
        const errorDivs = document.querySelectorAll(".error");
        errorDivs.forEach((div) => (div.innerText = ""));
        errorDivs[idx].innerText = "* " + e;
      });
  }

  async function courseStudentListToCourseList() {
    const courseIdList = new Set(
      props.courseStudentByStudentId.map((cs) => cs.courseId)
    );
    console.log("courseIdList ", courseIdList);
    const resp = await getAllCourse();
    console.log("resp ", resp);
    setStudentCourseList(resp.filter((course) => courseIdList.has(course.id)));
    return resp.filter((course) => !courseIdList.has(course.id));
  }

  return (
    <div className="flex column">
      <h2>available courses</h2>
      {!props.isStudent ? (
        <button onClick={() => props.setOpenForm(true)}>
          Create new course
        </button>
      ) : (
        courseList.map((course, idx) => (
          <div class="courseItem">
            <div className="courseCode center">{course.code}</div>
            <div className="courseTime center">
              {course.startTime} - {course.endTime}
            </div>
            <div className="courseDay center">{DAY_LIST[course.dayId]}</div>
            <button
              className="flex center cursor-pointer"
              onClick={() =>
                handleAddCourseStudent(
                  {
                    studentId: person,
                    courseId: courseList[idx].id,
                  },
                  idx
                )
              }
            >
              Add
            </button>
            <div className="error center"></div>
          </div>
        ))
      )}
      <h2>current courses</h2>
      {(props.isStudent ? studentCourseList : courseList).map((course, idx) => (
        <div class="courseItem">
          <div className="courseCode center">{course.code}</div>
          <div className="courseTime center">
            {course.startTime} - {course.endTime}
          </div>
          <div className="courseDay center">{DAY_LIST[course.dayId]}</div>
          <button
            className="flex center cursor-pointer"
            onClick={() => handleDelete(course.id, idx + courseList.length)}
          >
            Delete
          </button>
          <div className="error center"></div>
        </div>
      ))}
    </div>
  );
}

export default CourseOptions;
