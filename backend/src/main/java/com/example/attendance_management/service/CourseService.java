package com.example.attendance_management.service;

import com.example.attendance_management.mapper.CourseMapper;
import com.example.attendance_management.model.dto.PersonDTO;
import com.example.attendance_management.model.dto.CourseDTO;
import com.example.attendance_management.model.entity.CourseStudent;
import com.example.attendance_management.model.entity.Person;
import com.example.attendance_management.model.entity.Course;
import com.example.attendance_management.repository.PersonRepository;
import com.example.attendance_management.repository.CourseRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CourseMapper courseMapper;
    @Autowired
    private InstructorService instructorService;
    @Autowired
    private WeekdayService weekdayService;

    public CourseDTO addCourse(CourseDTO courseDTO) throws Exception {
        List<Course> courseList = getCoursesByInstructorId(courseDTO.getInstructorId());
        Course newCourse = courseMapper.courseDTOToCourse(courseDTO);
        if(!courseList.stream().filter(course -> isTimeConflict(course, newCourse)).toList().isEmpty()) {
            throw new Exception("Course time is incompatible with schedule");
        }
        Course savedCourse = courseRepository.save(newCourse);
        return courseMapper.courseToCourseDTO(savedCourse);
    }

    public List<CourseDTO> getAllCourses() {
        List<Course> courseList = (List<Course>) courseRepository.findAll();
        return courseMapper.courseListToCourseDTOList(courseList);
    }

    public CourseDTO updateCourse(Long id, CourseDTO courseDTO) throws Exception {
        Course course = courseMapper.courseDTOToCourse(courseDTO);
        assignIds(id, course);
        Course savedCourse = courseRepository.save(course);
        return courseMapper.courseToCourseDTO(savedCourse);
    }

    public String deleteCourse(Long id) throws Exception {
        Course course;
        course = getById(id);
        courseRepository.delete(course);

        return "Successfully deleted";
    }

    private void assignIds(Long id, Course course) throws Exception {
        course.setId(id);
        course.setInstructor(instructorService.getById(course.getInstructor().getId()));
        course.setWeekDay(weekdayService.getById(course.getWeekDay().getId()));
    }

    public Course getById(Long id) throws Exception {
        Optional<Course> optionalCourse = courseRepository.findById(id);
        if(optionalCourse.isEmpty()) {
            throw new Exception("No course found for given id");
        }
        return optionalCourse.get();
    }

    public List<Course> getByIdList(List<Long> idList) {
        return courseRepository.findByIdIn(idList);
    }

    private List<Course> getCoursesByInstructorId(Long instructorId) throws Exception {
        return courseRepository.findByInstructorId(instructorId);
    }

    private Boolean isTimeConflict(Course course1, Course course2) {
        if (!Objects.equals(course1.getWeekDay().getId(), course2.getWeekDay().getId())) {
            return false;
        }

        LocalTime start1 = course1.getStartTime();
        LocalTime end1 = course1.getEndTime();
        LocalTime start2 = course2.getStartTime();
        LocalTime end2 = course2.getEndTime();

        return start1.isBefore(end2) && end1.isAfter(start2);
    }
}
