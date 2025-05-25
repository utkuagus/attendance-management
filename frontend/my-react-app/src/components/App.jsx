import { useEffect, useState } from "react";
import "../css/Login.css";
import ScheduleTable from "./ScheduleTable";
import CourseOptions from "./CourseOptions";
import Login from "./Login";
import PersonTypeSelect from "./PersonTypeSelect";
import { getAllCourseStudent } from "../api/CourseStudentApi";

function App() {
  const [courseStudentTrigger, setCourseStudentTrigger] = useState(false);
  const [personId, setPersonId] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isPersonTypeSelected, setIsPersonTypeSelected] = useState(false);
  const [courseStudentByStudentId, setCourseStudentByStudentId] =
    useState(null);

  useEffect(() => {
    async function get() {
      if (!personId || !isStudent) {
        return;
      }
      const courseStudentList = await getAllCourseStudent();
      const filteredList = courseStudentList.filter(
        (cs) => cs.studentId == personId
      );
      console.log("filtered list ", filteredList);
      setCourseStudentByStudentId(filteredList);
    }

    get();
  }, [personId, courseStudentTrigger]);

  if (!isPersonTypeSelected) {
    return (
      <PersonTypeSelect
        setIsStudent={setIsStudent}
        setIsPersonTypeSelected={setIsPersonTypeSelected}
      />
    );
  }

  if (!personId) {
    return <Login setPersonId={setPersonId} isStudent={isStudent} />;
  }

  return (
    <div className="page-container flex center space-between">
      <CourseOptions
        setCourseStudentTrigger={setCourseStudentTrigger}
        personId={personId}
        isStudent={isStudent}
        courseStudentByStudentId={courseStudentByStudentId}
      />
      <ScheduleTable
        courseStudentTrigger={courseStudentTrigger}
        personId={personId}
        isStudent={isStudent}
      />
    </div>
  );
}

export default App;
