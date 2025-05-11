package com.example.attendance_management.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private LocalTime startTime;
    private LocalTime endTime;

    @ManyToOne(optional = false)
    @JoinColumn(name = "day_id", nullable = false)
    private WeekDay weekDay;

    @ManyToOne
    @JoinColumn(name = "instructor_id", nullable = false)
    private Instructor instructor;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<CourseStudent> courseStudentList;
}
