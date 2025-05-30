package com.example.attendance_management.controller;

import com.example.attendance_management.model.dto.InstructorDTO;
import com.example.attendance_management.service.InstructorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instructor")
public class InstructorController {
    @Autowired
    private InstructorService instructorService;

    @PostMapping
    public InstructorDTO addInstructor(@Valid @RequestBody InstructorDTO instructorDTO) throws Exception {
        return instructorService.addInstructor(instructorDTO);
    }

    @GetMapping
    public List<InstructorDTO> getAllInstructors() {
        return instructorService.getAllInstructors();
    }

    @GetMapping("/{id}")
    public InstructorDTO getInstructorById(@PathVariable("id") Long id) {
        return instructorService.getInstructorById(id);
    }

    @PutMapping("/{id}")
    public InstructorDTO updateInstructor(@PathVariable("id") Long id, @Valid @RequestBody InstructorDTO instructorDTO) throws Exception {
        return instructorService.updateInstructor(id, instructorDTO);
    }

    @DeleteMapping("/{id}")
    public String deleteInstructor(@Valid @PathVariable("id") Long id) throws Exception {
        return instructorService.deleteInstructor(id);
    }
}
