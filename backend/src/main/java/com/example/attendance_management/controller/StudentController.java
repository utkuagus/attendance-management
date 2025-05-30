package com.example.attendance_management.controller;

import com.example.attendance_management.model.dto.StudentDTO;
import com.example.attendance_management.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping
    public StudentDTO addStudent(@Valid @RequestBody StudentDTO studentDTO) throws Exception {
        return studentService.addStudent(studentDTO);
    }

    @GetMapping
    public List<StudentDTO> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PutMapping("/{id}")
    public StudentDTO updateStudent(@PathVariable("id") Long id, @Valid @RequestBody StudentDTO studentDTO) throws Exception {
        return studentService.updateStudent(id, studentDTO);
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(@Valid @PathVariable("id") Long id) throws Exception {
        return studentService.deleteStudent(id);
    }
}
