package com.example.attendance_management.repository;

import com.example.attendance_management.model.entity.WeekDay;
import org.springframework.data.repository.CrudRepository;

public interface WeekdayRepository  extends CrudRepository<WeekDay, Long> {
}
