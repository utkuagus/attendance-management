package com.example.attendance_management.service;

import com.example.attendance_management.mapper.CourseStudentMapper;
import com.example.attendance_management.model.dto.CourseStudentDTO;
import com.example.attendance_management.model.entity.Course;
import com.example.attendance_management.model.entity.CourseStudent;
import com.example.attendance_management.repository.CourseStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class CourseStudentService {
    @Autowired
    private CourseStudentRepository courseStudentRepository;
    @Autowired
    private CourseStudentMapper courseStudentMapper;
    @Autowired
    private CourseService courseService;

    public CourseStudentDTO addCourseStudent(CourseStudentDTO courseStudentDTO) throws Exception {
        List<Course> courseList = getCoursesByStudentId(courseStudentDTO.getStudentId());
        Course newCourse = courseService.getById(courseStudentDTO.getCourseId());
        if(!courseList.stream().filter(course -> isTimeConflict(course, newCourse)).toList().isEmpty()) {
            throw new Exception("Course time is incompatible with schedule");
        }
        CourseStudent courseStudent = courseStudentMapper.courseStudentDTOToCourseStudent(courseStudentDTO);
        CourseStudent savedCourseStudent = courseStudentRepository.save(courseStudent);
        return courseStudentMapper.courseStudentToCourseStudentDTO(savedCourseStudent);
    }

    public List<CourseStudentDTO> getAllCourseStudents() {
        List<CourseStudent> courseStudentList = (List<CourseStudent>) courseStudentRepository.findAll();
        return courseStudentMapper.courseStudentListToCourseStudentDTOList(courseStudentList);
    }

    public String deleteCourseStudent(Long id) throws Exception {
        CourseStudent courseStudent;
        courseStudent = getById(id);
        courseStudentRepository.delete(courseStudent);

        return "Successfully deleted";
    }

    private CourseStudent getById(Long id) throws Exception {
        Optional<CourseStudent> optionalCourseStudent = courseStudentRepository.findById(id);
        if(optionalCourseStudent.isEmpty()) {
            throw new Exception("No courseStudent found for given id");
        }
        return optionalCourseStudent.get();
    }

    private List<Course> getCoursesByStudentId(Long studentId) throws Exception {
        List<CourseStudent> courseStudentList = courseStudentRepository.findByStudentId(studentId);
        List<Long> idList = courseStudentList.stream().map(cs -> cs.getCourse().getId()).toList();
        return courseService.getByIdList(idList);
    }

    private Boolean isTimeConflict(Course course1, Course course2) {
        if (course1.getWeekDay() != course2.getWeekDay()) {
            return false;
        }

        LocalTime start1 = course1.getStartTime();
        LocalTime end1 = course1.getEndTime();
        LocalTime start2 = course2.getStartTime();
        LocalTime end2 = course2.getEndTime();

        if (start1.isBefore(end2) && end1.isAfter(start2)) {
            return true;
        }

        return false;
    }
}
