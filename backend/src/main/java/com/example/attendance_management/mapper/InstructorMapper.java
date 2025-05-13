package com.example.attendance_management.mapper;

import com.example.attendance_management.model.dto.InstructorDTO;
import com.example.attendance_management.model.entity.Instructor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring") // Enable Spring integration
public interface InstructorMapper {

    InstructorDTO instructorToInstructorDTO(Instructor instructor);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "person.id", ignore = true)
    Instructor instructorDTOToInstructor(InstructorDTO instructorDTO);

    List<InstructorDTO> instructorListToInstructorDTOList(List<Instructor> instructors);

    List<Instructor> instructorDTOListToInstructorList(List<InstructorDTO> instructorDTOs);

}