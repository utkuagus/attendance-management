package com.example.attendance_management.repository;

import com.example.attendance_management.model.entity.Person;
import org.springframework.data.repository.CrudRepository;

public interface PersonRepository extends CrudRepository<Person, Long> {
}
