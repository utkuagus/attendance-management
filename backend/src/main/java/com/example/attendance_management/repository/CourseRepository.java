package com.example.attendance_management.repository;

import com.example.attendance_management.model.entity.Course;
import com.example.attendance_management.model.entity.CourseStudent;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;
import java.util.List;

public interface CourseRepository extends CrudRepository<Course, Long> {
    @Query("select c from Course c where c.id in ?1")
    List<Course> findByIdIn(Collection<Long> ids);

    @Query("select c from Course c where c.instructor.id = ?1")
    List<Course> findByInstructorId(Long id);
}
