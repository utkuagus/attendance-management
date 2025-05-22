import { useEffect, useState } from "react";
import { getAllCourseStudent } from "../api/CourseStudentApi";
import { getAllCourse } from "../api/CourseApi";
import { getDayList } from "../utils/DayList.JSX";

function ScheduleTable(props) {
  const START_HOUR = 9,
    HOUR_COUNT = 9;
  const DAY_LIST = getDayList();
  const HOUR_LIST = [...Array(HOUR_COUNT).keys()].map(
    (i) => digitalNum(i + START_HOUR) + " - " + digitalNum(i + START_HOUR + 1)
  );
  const [courseList, setCourseList] = useState();
  const [courseData, setCourseData] = useState();
  const [schedule, setSchedule] = useState();

  const student = props.personId;

  useEffect(() => {
    function getForStudent() {
      getAllCourseStudent().then((resp) => {
        const idList = resp
          .filter((courseStudent) => courseStudent.studentId == student)
          .map((courseStudent) => courseStudent.courseId);
        setCourseList(idList);
      });
    }

    function getForInstructor() {
      getAllCourse().then((resp) => {
        const idList = resp
          .filter((course) => course.instructorId == student)
          .map((course) => course.id);
        setCourseList(idList);
      });
    }

    const get = props.isStudent ? getForStudent : getForInstructor;
    get();
    setSchedule(
      Array(HOUR_LIST.length)
        .fill(null)
        .map(() => Array(DAY_LIST.length).fill(null))
    );
  }, [props.courseStudentTrigger]);

  useEffect(() => {
    console.log(schedule);
  }, [schedule]);

  useEffect(() => {
    if (!courseList) {
      return;
    }
    function get() {
      getAllCourse().then((resp) => {
        setCourseData(resp.filter((r) => courseList.includes(r.id)));
      });
    }

    get();
  }, [courseList]);

  useEffect(() => {
    if (!courseData) {
      return;
    }
    function applyCourseToSchedule(course, idx) {
      console.log("Apply course: " + course.dayId);
      const day = course.dayId;
      const starthour = parseInt(course.startTime.substring(0, 2)) - 9;
      const endHour = parseInt(course.endTime.substring(0, 2)) - 9;
      console.log(starthour + " " + endHour + " " + day);
      fillSchedule(day, starthour, endHour, idx);
    }
    console.log("course count " + courseData.length);
    console.log(courseData);
    courseData.forEach(applyCourseToSchedule);
  }, [courseData]);

  function fillSchedule(day, starthour, endHour, idx) {
    setSchedule((schedule) => [
      ...schedule.slice(0, starthour),
      ...fillRow([...schedule.slice(starthour, endHour)], day, idx),
      ...schedule.slice(endHour),
    ]);
  }

  function fillRow(schedulePart, day, idx) {
    return schedulePart.map((part) => [
      ...part.slice(0, day),
      courseData[idx].code,
      ...part.slice(day + 1),
    ]);
  }

  function digitalNum(num) {
    return ("0" + num).substring(1) + ":00";
  }

  function assignCells(row, col) {
    if (row == 0) {
      if (col == 0) {
        return null;
      }
      return colHeaders[col - 1];
    }
    if (col == 0) {
      return rowHeaders[row - 1];
    }
    return schedule[row - 1][col - 1];
  }

  const rowHeaders = HOUR_LIST;
  const colHeaders = DAY_LIST;

  if (!schedule) {
    return null;
  }
  return (
    <>
      <div className="schedule-table">
        {[...Array(rowHeaders.length + 1).keys()].map((row) => (
          <div className="flex-row">
            {[...Array(colHeaders.length + 1).keys()].map((col) => (
              <div className="table-item center">{assignCells(row, col)}</div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default ScheduleTable;
