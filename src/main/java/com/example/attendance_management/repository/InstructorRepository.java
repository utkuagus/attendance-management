package com.example.attendance_management.repository;

import com.example.attendance_management.model.entity.Instructor;
import org.springframework.data.repository.CrudRepository;

public interface InstructorRepository extends CrudRepository<Instructor, Long> {

}
