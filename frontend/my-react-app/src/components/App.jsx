import { useEffect, useState } from "react";
import "../css/Login.css";
import ScheduleTable from "./ScheduleTable";
import CourseOptions from "./CourseOptions";
import Login from "./Login";
import PersonTypeSelect from "./PersonTypeSelect";
import { getAllCourseStudent } from "../api/CourseStudentApi";
import CourseForm from "./CourseForm";

function App() {
  const [courseStudentTrigger, setCourseStudentTrigger] = useState(false);
  const [personId, setPersonId] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isPersonTypeSelected, setIsPersonTypeSelected] = useState(false);
  const [courseStudentByStudentId, setCourseStudentByStudentId] = useState(0);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    async function get() {
      if (!personId) {
        return;
      }
      return isStudent ? getForStudent() : getForInstructor();
    }

    async function getForStudent() {
      const courseStudentList = await getAllCourseStudent();
      const filteredList = courseStudentList.filter(
        (cs) => cs.studentId == personId
      );
      console.log("filtered list ", filteredList);
      setCourseStudentByStudentId(filteredList);
    }

    async function getForInstructor() {
      setCourseStudentByStudentId((cs) => cs + 1);
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
    return (
      <Login
        setPersonId={setPersonId}
        setIsPersonTypeSelected={setIsPersonTypeSelected}
        isStudent={isStudent}
      />
    );
  }

  if (openForm) {
    return <CourseForm personId={personId} />;
  }

  return (
    <div className="page-container flex center space-between">
      <CourseOptions
        setCourseStudentTrigger={setCourseStudentTrigger}
        personId={personId}
        isStudent={isStudent}
        courseStudentByStudentId={courseStudentByStudentId}
        setOpenForm={setOpenForm}
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
