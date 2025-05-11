package com.example.attendance_management.service;

import com.example.attendance_management.mapper.CourseStudentMapper;
import com.example.attendance_management.model.dto.PersonDTO;
import com.example.attendance_management.model.dto.CourseStudentDTO;
import com.example.attendance_management.model.entity.Person;
import com.example.attendance_management.model.entity.CourseStudent;
import com.example.attendance_management.repository.PersonRepository;
import com.example.attendance_management.repository.CourseStudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseStudentService {
    @Autowired
    private CourseStudentRepository courseStudentRepository;
    @Autowired
    private CourseStudentMapper courseStudentMapper;

    public CourseStudentDTO addCourseStudent(CourseStudentDTO courseStudentDTO) {
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
}
