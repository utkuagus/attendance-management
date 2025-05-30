import { useEffect, useState } from "react";
import { getAllCourseStudent } from "../api/CourseStudentApi";
import { getAllCourse } from "../api/CourseApi";
import { getDayList } from "../utils/DayList.JSX";

function ScheduleTable(props) {
  const convertDigital = (num) => num.toString().padStart(2, "0") + ":00";

  const START_HOUR = 9,
    HOUR_COUNT = 9;
  const DAY_LIST = getDayList();
  const HOUR_LIST = [...Array(HOUR_COUNT).keys()].map(
    (i) =>
      convertDigital(i + START_HOUR) +
      " - " +
      convertDigital(i + START_HOUR + 1)
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
      const day = course.dayId;
      const starthour = parseInt(course.startTime.substring(0, 2)) - 9;
      const endHour = parseInt(course.endTime.substring(0, 2)) - 9;
      const isStartInHalf = course.startTime.substring(3, 5) == "30";
      const isEndInHalf = course.endTime.substring(3, 5) == "30";
      fillSchedule(day, starthour, endHour, isStartInHalf, isEndInHalf, idx);
      colorSchedule();
    }
    courseData.forEach(applyCourseToSchedule);
  }, [courseData]);

  function colorSchedule() {}

  function fillSchedule(
    day,
    starthour,
    endHour,
    isStartInHalf,
    isEndInHalf,
    idx
  ) {
    setSchedule((schedule) => [
      ...schedule.slice(0, starthour),
      ...fillRow(
        [...schedule.slice(starthour, endHour + isEndInHalf)],
        day,
        isStartInHalf,
        isEndInHalf,
        idx
      ),
      ...schedule.slice(endHour + isEndInHalf),
    ]);
  }

  function fillRow(schedulePart, day, isStartInHalf, isEndInHalf, idx) {
    return schedulePart.map((part, scheduleIdx) => [
      ...part.slice(0, day),
      setHourSpace(
        courseData[idx].code,
        scheduleIdx == 0,
        scheduleIdx == schedulePart.length - 1,
        isStartInHalf,
        isEndInHalf
      ),
      ...part.slice(day + 1),
    ]);
  }

  function setHourSpace(code, isStart, isEnd, isStartInHalf, isEndInHalf) {
    if (isStart && isStartInHalf) {
      return [null, code];
    }
    if (isEnd && isEndInHalf) {
      return [code, null];
    }
    return code;
  }

  function digitalNum(num) {
    return num.padZeros() + ":00";
  }

  const orangeBg = { backgroundColor: "orange" };

  const getStyle = (val) => (val ? orangeBg : null);

  function assignCells(row, col) {
    if (row === 0) {
      if (col === 0) return null;
      return colHeaders[col - 1];
    }
    if (col === 0) {
      return rowHeaders[row - 1];
    }

    const cellValue = schedule[row - 1][col - 1];
    const isActive = Boolean(cellValue);

    if (Array.isArray(cellValue)) {
      return (
        <div className="center flex-column">
          <div style={getStyle(cellValue[0])} className="half center">
            {cellValue[0] ?? ""}
          </div>
          <div style={getStyle(cellValue[1])} className="half center">
            {cellValue[1] ?? ""}
          </div>
        </div>
      );
    }

    return (
      <div className="center" style={getStyle(cellValue)}>
        {cellValue}
      </div>
    );
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
              <div className="table-item flex-column center">
                {assignCells(row, col)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default ScheduleTable;
