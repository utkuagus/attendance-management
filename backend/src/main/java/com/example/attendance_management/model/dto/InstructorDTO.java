package com.example.attendance_management.model.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
public class InstructorDTO{
    private Long id;
    @Valid
    @NotNull(message = "Person is required")
    private PersonDTO person;
}
