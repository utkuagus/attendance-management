import { useEffect, useState } from "react";
import { getAllCourse, deleteCourse } from "../api/CourseApi";
import {
  insertCourseStudent,
  deleteCourseStudent,
} from "../api/CourseStudentApi";
import { getDayList } from "../utils/DayList.JSX";
import { getInstructorById } from "../api/InstructorApi";

function CourseOptions(props) {
  const [courseList, setCourseList] = useState([]);
  const [studentCourseList, setStudentCourseList] = useState([]);
  const [instructorNameById, setInstructorNameById] = useState({});
  const DAY_LIST = getDayList();
  const person = props.personId;

  const title = props.isStudent ? "available courses" : "current courses";

  const getAll = (instructorId) =>
    props.isStudent
      ? courseStudentListToCourseList()
      : getCoursesByInstructorId(instructorId);

  async function getCoursesByInstructorId(instructorId) {
    let filteredResp;
    try {
      const resp = await getAllCourse();
      filteredResp = resp.filter(
        (course) => course.instructorId == instructorId
      );
    } catch (err) {}
    return filteredResp;
  }

  useEffect(() => {
    async function map() {
      let courses = [];
      try {
        courses = await getAllCourse();
      } catch (e) {
        console.log("getAllCourse error: ", e);
        return;
      }

      const entries = await Promise.all(
        courses.map(async (course) => {
          let instructor = { person: { name: "Unknown" } };
          try {
            const result = await getInstructorById(course.instructorId);
            if (result?.person?.name) instructor = result;
          } catch (e) {
            console.log("getInstructorById error: ", e);
          }
          return [course.id, instructor.person.name];
        })
      );

      const nameByIdDict = Object.fromEntries(entries);
      console.log("nameById", nameByIdDict);
      setInstructorNameById(nameByIdDict);
    }

    map();
  }, [props.newCourseTrigger]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const resp = await getAll(person);
        setCourseList(resp);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    }

    if (!person || !props.courseStudentByStudentId) {
      return;
    }
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
    const resp = await getAllCourse();
    setStudentCourseList(resp.filter((course) => courseIdList.has(course.id)));
    return resp.filter((course) => !courseIdList.has(course.id));
  }

  const getTimeWithoutSeconds = (time) =>
    time.replace(/^(\d{1,2}:\d{2}):\d{2}(?=(\s|$))/, "$1");

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
              {getTimeWithoutSeconds(course.startTime)} -{" "}
              {getTimeWithoutSeconds(course.endTime)}
            </div>
            <div className="courseDay center">{DAY_LIST[course.dayId]}</div>
            <div>{instructorNameById[course.id]}</div>
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
            {getTimeWithoutSeconds(course.startTime)} -{" "}
            {getTimeWithoutSeconds(course.endTime)}
          </div>
          <div className="courseDay center">{DAY_LIST[course.dayId]}</div>
          <div>{instructorNameById[course.id]}</div>
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
