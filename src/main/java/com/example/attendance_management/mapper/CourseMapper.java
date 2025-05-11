package com.example.attendance_management.mapper;

import com.example.attendance_management.model.dto.CourseDTO;
import com.example.attendance_management.model.entity.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring") // Enable Spring integration
public interface CourseMapper {

    @Mapping(source = "instructor.id", target = "instructorId")
    @Mapping(source = "weekDay.id", target = "dayId")
    CourseDTO courseToCourseDTO(Course course);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "instructorId", target = "instructor.id")
    @Mapping(source = "dayId", target = "weekDay.id")
    Course courseDTOToCourse(CourseDTO courseDTO);

    List<CourseDTO> courseListToCourseDTOList(List<Course> courses);

    List<Course> courseDTOListToCourseList(List<CourseDTO> courseDTOs);

}