import { useEffect, useState } from 'react'
import { getAllCourseStudent, addCourseStudent } from './api/CourseStudentApi'
import { getAllCourse } from './api/CourseApi'

function ScheduleTable() {
    const START_HOUR=9, HOUR_COUNT=9
    const DAY_LIST = ["Monday","Tuesday", "Wednesday","Thursday","Friday"]
    const HOUR_LIST = [...Array(HOUR_COUNT).keys()].map(i => digitalNum(i + START_HOUR) + " - " + digitalNum(i + START_HOUR + 1))
    const [student, setStudent] = useState();
    const [course, setCourse] = useState();
    const [courseData, setCourseData] = useState()    
    const [schedule, setSchedule] = useState()
    
useEffect(() => {
  const enrollStudent = async () => {
    try {
      await addCourseStudent({
        courseId: 6,
        studentId: 3,
      });
    } catch (error) {
      console.error('Enrollment failed:', error);
    }
  };

  enrollStudent();
}, []);

    useEffect(() => {
        function get() {
            getAllCourseStudent().then(resp => {
                setStudent(resp[0].studentId)
                setCourse(resp[0].courseId)
            })
        }

        get()
        setSchedule(Array(HOUR_LIST.length).fill(null).map(() => Array(DAY_LIST.length).fill(null)))
    }, [])

    useEffect(() => {
        console.log(schedule)
    }, [schedule])

    useEffect(() => {
        if(!course) {
            return
        }
        function get() {
            getAllCourse().then(resp => {
                setCourseData(resp.find(r => r.id == student))
            })
        }

        get()
    }, [course])

    useEffect(() => {
        if(!courseData) {
            return
        }
        const day = courseData.dayId - 1
        const starthour = parseInt(courseData.startTime.substring(0,2)) - 9
        const endHour = parseInt(courseData.endTime.substring(0,2)) - 9
        console.log(starthour + " " + endHour + " " + day)
        fillSchedule(day, starthour, endHour) 
    },[courseData])


    function fillSchedule(day, starthour, endHour) {
        setSchedule(schedule => [
            ...schedule.slice(0, starthour),
            ...fillRow([...schedule.slice(starthour,endHour + 1)], day),
            ...schedule.slice(endHour + 1)
        ])
    }

    function fillRow(schedulePart, day) {
        return schedulePart.map(part => [
            ...part.slice(0, day),
            courseData.code,
            ...part.slice(day + 1)
        ])
    }

    function digitalNum(num) {
        return ("0" + num).substring(1) + ":00"
    }

    function assignCells(row,col) {
        if(row == 0) {
            if(col == 0) {
                return null
            }
            return colHeaders[col - 1]
        }
        if(col == 0) {
            return rowHeaders[row - 1]
        }
        return schedule[row - 1][col - 1]
    }
  
  const rowHeaders = HOUR_LIST
  const colHeaders = DAY_LIST

  if(!schedule) {
    return null
  }
      return (
        <>
        <div className="flex-container">
            {[...Array(rowHeaders.length + 1).keys()].map(row => (<div className='flex-row'>
                {[...Array(colHeaders.length + 1).keys()].map(col => (<div className='flex-item center'>{assignCells(row,col)}</div>))}
            </div>))}
        </div>
        </>
      )
  }
  
  export default ScheduleTable
  