import { useEffect, useState } from "react";
import { getDayList } from "../utils/DayList.JSX";
import { createCourse } from "../api/CourseApi";

export default function CourseForm(props) {
  const convertDigital = (num) => num.toString().padStart(2, "0");

  const HOUR_LIST = [...Array(10)].map((_, i) => i + 9);
  const MINUTE_LIST = [0, 30];

  const [courseName, setCourseName] = useState(null);
  const [courseDay, setCourseDay] = useState(null);
  const [startHour, setStartHour] = useState(null);
  const [startMin, setStartMin] = useState(null);
  const [endHour, setEndHour] = useState(null);
  const [endMin, setEndMin] = useState(null);
  const [endHourList, setEndHourList] = useState([]);
  const [endMinList, setEndMinList] = useState([]);

  const resetForm = () => {
    setCourseName("");
    setCourseDay(null);
    setStartHour(null);
    setStartMin(null);
    setEndHour(null);
    setEndMin(null);
    setEndHourList([]);
    setEndMinList([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      code: courseName,
      startTime: `${convertDigital(startHour)}:${convertDigital(startMin)}:00`,
      endTime: `${convertDigital(endHour)}:${convertDigital(endMin)}:00`,
      instructorId: props.personId,
      dayId: courseDay,
    };

    try {
      const response = await createCourse(data);
      console.log("Course created:", response);
      alert("New course is created");
      resetForm();
      // Do something on success, like reset form or notify user
    } catch (error) {
      console.error("Failed to create course:", error);
      alert("Failed to create new course");
      // Show user-friendly error message or UI feedback
    }
  };

  useEffect(() => {
    console.log("endHour", endHour);
    setEndHourList(HOUR_LIST.filter((hour) => hour >= startHour));
    setEndMinList(
      MINUTE_LIST.filter((min) => startHour != endHour || startMin <= min)
    );
  }, [startHour, startMin, endHour]);

  useEffect(() => {
    if (!endHour) {
      return;
    }
    if (endHourList[0] && endHourList[0] > endHour) {
      setEndHour(endHourList[0]);
    }
  }, [endHourList]);

  useEffect(() => {
    if (!endMin) {
      return;
    }
    if (endMinList[0] && endMinList[0] > endMin) {
      setEndMin(endMinList[0]);
    }
  }, [endMinList]);

  const handleSelectChanges = (setState, e) => {
    const value = e.target.value;
    setState(value == "default" ? null : value);
  };

  return (
    <div className="page-container flex center column gap">
      <div className="login-form flex column gap">
        <div className="flex pos-relative">
          <label htmlFor="courseName">Course Name</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>

        <div className="flex pos-relative">
          <label htmlFor="courseDay">Course Day</label>
          <select
            id="courseDay"
            value={courseDay || "default"}
            onChange={(e) => handleSelectChanges(setCourseDay, e)}
          >
            <option value="default">--Select a day--</option>
            {getDayList().map((day, idx) => (
              <option value={idx}>{day}</option>
            ))}
          </select>
        </div>

        <div className="flex pos-relative">
          <label htmlFor="startTime">Start Time</label>
          <select
            id="startHour"
            value={startHour || ""}
            onChange={(e) => handleSelectChanges(setStartHour, e)}
          >
            <option value="default">--</option>
            {HOUR_LIST.map((hour) => (
              <option value={hour}>{convertDigital(hour)}</option>
            ))}
          </select>
          <select
            id="startMin"
            value={startMin || ""}
            onChange={(e) => handleSelectChanges(setStartMin, e)}
          >
            <option value="default">--</option>
            {MINUTE_LIST.map((min, idx) => (
              <option value={min}>{convertDigital(min)}</option>
            ))}
          </select>
        </div>

        {!startHour || !startMin ? null : (
          <div className="flex pos-relative">
            <label htmlFor="endTime">End Time</label>
            <select
              id="endHour"
              value={endHour || ""}
              onChange={(e) => handleSelectChanges(setEndHour, e)}
            >
              <option value="default">--</option>
              {endHourList.map((hour, idx) => (
                <option value={hour}>{convertDigital(hour)}</option>
              ))}
            </select>
            <select
              id="endMin"
              value={endMin || ""}
              onChange={(e) => handleSelectChanges(setEndMin, e)}
            >
              <option value="default">--</option>
              {endMinList.map((min, idx) => (
                <option value={min}>{convertDigital(min)}</option>
              ))}
            </select>
          </div>
        )}
        <br />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <button type="reset" onClick={resetForm}>
          Reset
        </button>
      </div>
    </div>
  );
}
