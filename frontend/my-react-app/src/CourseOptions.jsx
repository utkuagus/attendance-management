import { useEffect, useState } from 'react'
import { getAllCourse } from './api/CourseApi'
import { addCourseStudent } from './api/CourseStudentApi';

function CourseOptions() {
    const [courseList, setCourseList] = useState([])
    const student = 3;

    useEffect(() => {
        async function fetchCourses() {
        try {
            const resp = await getAllCourse();
            setCourseList(resp);
            console.log(resp);
        } catch (err) {
            console.error("Error fetching courses:", err);
        }
        }

        fetchCourses();
    }, []);


    return (<div className="flex-column">
        {
            courseList.map((course, idx) => <div class="courseItem" onClick={() => addCourseStudent({
                studentId: student,
                courseId: courseList[idx].id
            })}>
                <div className="courseOption center">{course.code}</div>
                <div className="courseTime center">{course.startTime} - {course.endTime}</div>
            </div>)
        }
    </div>)
}

export default CourseOptions;
  