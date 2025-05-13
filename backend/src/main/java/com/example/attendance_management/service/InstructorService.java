package com.example.attendance_management.service;

import com.example.attendance_management.mapper.InstructorMapper;
import com.example.attendance_management.model.dto.PersonDTO;
import com.example.attendance_management.model.dto.InstructorDTO;
import com.example.attendance_management.model.entity.Person;
import com.example.attendance_management.model.entity.Instructor;
import com.example.attendance_management.repository.PersonRepository;
import com.example.attendance_management.repository.InstructorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InstructorService {
    @Autowired
    private InstructorRepository instructorRepository;
    @Autowired
    private InstructorMapper instructorMapper;

    public InstructorDTO addInstructor(InstructorDTO instructorDTO) {
        Instructor instructor = instructorMapper.instructorDTOToInstructor(instructorDTO);
        Instructor savedInstructor = instructorRepository.save(instructor);
        return instructorMapper.instructorToInstructorDTO(savedInstructor);
    }

    public List<InstructorDTO> getAllInstructors() {
        List<Instructor> instructorList = (List<Instructor>) instructorRepository.findAll();
        return instructorMapper.instructorListToInstructorDTOList(instructorList);
    }

    public InstructorDTO updateInstructor(Long id, InstructorDTO instructorDTO) throws Exception {
        Instructor instructor = instructorMapper.instructorDTOToInstructor(instructorDTO);
        instructor.setId(id);
        instructor.getPerson().setId(getById(id).getPerson().getId());
        Instructor savedInstructor = instructorRepository.save(instructor);
        return instructorMapper.instructorToInstructorDTO(savedInstructor);
    }

    public String deleteInstructor(Long id) throws Exception {
        Instructor instructor;
        instructor = getById(id);
        instructorRepository.delete(instructor);

        return "Successfully deleted";
    }

    public Instructor getById(Long id) throws Exception {
        Optional<Instructor> optionalInstructor = instructorRepository.findById(id);
        if(optionalInstructor.isEmpty()) {
            throw new Exception("No instructor found for given id");
        }
        return optionalInstructor.get();
    }
}
