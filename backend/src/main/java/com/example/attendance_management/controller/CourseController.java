package com.example.attendance_management.controller;

import com.example.attendance_management.model.dto.CourseDTO;
import com.example.attendance_management.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @PostMapping
    public CourseDTO addCourse(@RequestBody CourseDTO courseDTO) throws Exception {
        return courseService.addCourse(courseDTO);
    }

    @GetMapping
    public List<CourseDTO> getAllCourses() {
        return courseService.getAllCourses();
    }

    @PutMapping("/{id}")
    public CourseDTO updateCourse(@PathVariable("id") Long id, @RequestBody CourseDTO courseDTO) throws Exception {
        return courseService.updateCourse(id, courseDTO);
    }

    @DeleteMapping("/{id}")
    public String deleteCourse(@PathVariable("id") Long id) throws Exception {
        return courseService.deleteCourse(id);
    }
}
