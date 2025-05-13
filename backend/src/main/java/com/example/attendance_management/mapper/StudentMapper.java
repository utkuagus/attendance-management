package com.example.attendance_management.mapper;

import com.example.attendance_management.model.dto.StudentDTO;
import com.example.attendance_management.model.entity.Student;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring") // Enable Spring integration
public interface StudentMapper {

    StudentDTO studentToStudentDTO(Student student);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "person.id", ignore = true)
    Student studentDTOToStudent(StudentDTO studentDTO);

    List<StudentDTO> studentListToStudentDTOList(List<Student> students);

    List<Student> studentDTOListToStudentList(List<StudentDTO> studentDTOs);

}