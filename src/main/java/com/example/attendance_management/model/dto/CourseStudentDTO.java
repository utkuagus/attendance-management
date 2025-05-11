package com.example.attendance_management.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseStudentDTO {
    private Long id;
    private Long courseId;
    private Long studentId;
}