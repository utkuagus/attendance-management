package com.example.attendance_management.repository;

import com.example.attendance_management.model.entity.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentRepository extends CrudRepository<Student, Long> {

}
