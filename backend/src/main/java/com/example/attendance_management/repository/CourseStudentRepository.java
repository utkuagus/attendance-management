package com.example.attendance_management.repository;

import com.example.attendance_management.model.entity.CourseStudent;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CourseStudentRepository extends CrudRepository<CourseStudent, Long> {
    @Query("select c from CourseStudent c where c.student.id = ?1")
    List<CourseStudent> findByStudentId(Long id);

}
