import { useEffect, useState } from "react";
import "../css/Login.css";
import ScheduleTable from "./ScheduleTable";
import CourseOptions from "./CourseOptions";
import Login from "./Login";
import PersonTypeSelect from "./PersonTypeSelect";

function App() {
  const [courseStudentTrigger, setCourseStudentTrigger] = useState(false);
  const [personId, setPersonId] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isPersonTypeSelected, setIsPersonTypeSelected] = useState(false);

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
