import { useEffect, useState } from "react";
import { getAllCourse } from "../api/CourseApi";
import { insertCourseStudent } from "../api/CourseStudentApi";
import { getDayList } from "../utils/DayList.JSX";

function CourseOptions(props) {
  const [courseList, setCourseList] = useState([]);
  const DAY_LIST = getDayList();
  const person = props.personId;

  const title = props.isStudent ? "available courses" : "current courses";

  const getAll = (instructorId) =>
    props.isStudent ? getAllCourse() : getCoursesByInstructorId(instructorId);

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

    console.log("checking person id", person);
    if (person) {
      fetchCourses();
    }
  }, [person]);

  function addCourseStudent(courseStudent, idx) {
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

  return (
    <div className="flex column">
      <h2>{title}</h2>
      <div className="flex column">
        {courseList.map((course, idx) => (
          <div
            class="courseItem"
            onClick={() =>
              addCourseStudent(
                {
                  studentId: person,
                  courseId: courseList[idx].id,
                },
                idx
              )
            }
          >
            <div className="courseCode center">{course.code}</div>
            <div className="courseTime center">
              {course.startTime} - {course.endTime}
            </div>
            <div className="courseDay center">{DAY_LIST[course.dayId]}</div>
            <div className="error center"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseOptions;
