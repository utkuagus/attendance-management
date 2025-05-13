package com.example.attendance_management.mapper;

import com.example.attendance_management.model.dto.CourseStudentDTO;
import com.example.attendance_management.model.entity.CourseStudent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring") // Enable Spring integration
public interface CourseStudentMapper {

    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "student.id", target = "studentId")
    CourseStudentDTO courseStudentToCourseStudentDTO(CourseStudent courseStudent);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "courseId", target = "course.id")
    @Mapping(source = "studentId", target = "student.id")
    CourseStudent courseStudentDTOToCourseStudent(CourseStudentDTO courseStudentDTO);

    List<CourseStudentDTO> courseStudentListToCourseStudentDTOList(List<CourseStudent> courseStudents);

    List<CourseStudent> courseStudentDTOListToCourseStudentList(List<CourseStudentDTO> courseStudentDTOs);

}