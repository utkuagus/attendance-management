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
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class InstructorService {
    @Autowired
    private InstructorRepository instructorRepository;
    @Autowired
    private InstructorMapper instructorMapper;

    private Boolean isCredentialExists(Instructor instructor,Instructor newInstructor) {
        return Objects.equals(instructor.getPerson().getUsername(), newInstructor.getPerson().getUsername());
    }

    public InstructorDTO addInstructor(InstructorDTO instructorDTO) throws Exception {
        List<Instructor> instructorList = (List<Instructor>) instructorRepository.findAll();
        Instructor newInstructor = instructorMapper.instructorDTOToInstructor(instructorDTO);
        if(!instructorList.stream().filter(instructor -> isCredentialExists(instructor, newInstructor)).toList().isEmpty()) {
            throw new Exception("Username already exists");
        }
        Instructor savedInstructor = instructorRepository.save(newInstructor);
        return instructorMapper.instructorToInstructorDTO(savedInstructor);
    }

    public List<InstructorDTO> getAllInstructors() {
        List<Instructor> instructorList = (List<Instructor>) instructorRepository.findAll();
        return instructorMapper.instructorListToInstructorDTOList(instructorList);
    }

    public InstructorDTO getInstructorById(Long id) {
        Instructor instructor = instructorRepository.findById(id).orElse(null);
        return instructorMapper.instructorToInstructorDTO(instructor);
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
