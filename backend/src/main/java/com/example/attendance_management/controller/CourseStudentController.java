package com.example.attendance_management.controller;

import com.example.attendance_management.model.dto.CourseStudentDTO;
import com.example.attendance_management.service.CourseStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courseStudent")
public class CourseStudentController {
    @Autowired
    private CourseStudentService courseStudentService;

    @PostMapping
    public CourseStudentDTO addCourseStudent(@RequestBody CourseStudentDTO courseStudentDTO) throws Exception {
        return courseStudentService.addCourseStudent(courseStudentDTO);
    }

    @GetMapping
    public List<CourseStudentDTO> getAllCourseStudents() {
        return courseStudentService.getAllCourseStudents();
    }

    @DeleteMapping("/{id}")
    public String deleteCourseStudent(@PathVariable("id") Long id) throws Exception {
        return courseStudentService.deleteCourseStudent(id);
    }
}
