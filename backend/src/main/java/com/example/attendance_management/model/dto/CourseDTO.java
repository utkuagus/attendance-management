package com.example.attendance_management.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;

@Getter
@Setter
public class CourseDTO {
    private Long id;
    private String code;

    @JsonFormat(pattern="HH:mm:ss")
    private LocalTime startTime;

    @JsonFormat(pattern="HH:mm:ss")
    private LocalTime endTime;

    private Long instructorId;
    private Long dayId;
}
