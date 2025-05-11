package com.example.attendance_management.model.dto;

import com.example.attendance_management.model.entity.Student;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class PersonDTO {
    private Long id;
    private String name;
    private String username;
    private String password;
}
