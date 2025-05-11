package com.example.attendance_management.repository;

import com.example.attendance_management.model.entity.Course;
import com.example.attendance_management.model.entity.CourseStudent;
import org.springframework.data.repository.CrudRepository;

public interface CourseRepository extends CrudRepository<Course, Long> {
}
