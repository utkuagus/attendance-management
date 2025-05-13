package com.example.attendance_management.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "person_id", unique = true, nullable = false)
    private Person person;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<CourseStudent> courseStudentList;

}
