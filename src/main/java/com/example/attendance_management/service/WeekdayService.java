package com.example.attendance_management.service;
import com.example.attendance_management.model.entity.WeekDay;
import com.example.attendance_management.repository.StudentRepository;
import com.example.attendance_management.repository.WeekdayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WeekdayService {
    @Autowired
    private WeekdayRepository weekdayRepository;

    public WeekDay getById(Long id) throws Exception {
        Optional<WeekDay> optionalWeekDay = weekdayRepository.findById(id);
        if(optionalWeekDay.isEmpty()) {
            throw new Exception("No course found for given id");
        }
        return optionalWeekDay.get();
    }
}
