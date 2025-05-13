import { useEffect, useState } from 'react'
import './App.css'
import { getAll } from './api/StudentApi'
import ScheduleTable from './ScheduleTable'
import CourseOptions from './CourseOptions'

function App() {
  const [studentList, setStudentList] = useState([])

  useEffect(() => {
    async function fetchStudents() {
      try {
        const data = await getAll()
        setStudentList(data)
      } catch (error) {
        console.error('Failed to fetch students:', error)
      }
    }

    fetchStudents()
  }, [])

  return (
    <div className="flex-row full-width space-around">
        <CourseOptions/>
        <ScheduleTable/>
    </div>
  )
}

export default App
