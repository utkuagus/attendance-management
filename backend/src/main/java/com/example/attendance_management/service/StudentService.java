package com.example.attendance_management.service;

import com.example.attendance_management.mapper.StudentMapper;
import com.example.attendance_management.model.dto.PersonDTO;
import com.example.attendance_management.model.dto.StudentDTO;
import com.example.attendance_management.model.entity.Instructor;
import com.example.attendance_management.model.entity.Person;
import com.example.attendance_management.model.entity.Student;
import com.example.attendance_management.repository.PersonRepository;
import com.example.attendance_management.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private StudentMapper studentMapper;

    private Boolean isCredentialExists(Student student,Student newStudent) {
        return Objects.equals(student.getPerson().getUsername(), newStudent.getPerson().getUsername());
    }

    public StudentDTO addStudent(StudentDTO studentDTO) throws Exception {
        List<Student> studentList = (List<Student>) studentRepository.findAll();
        Student newStudent = studentMapper.studentDTOToStudent(studentDTO);
        if(!studentList.stream().filter(student -> isCredentialExists(student, newStudent)).toList().isEmpty()) {
            throw new Exception("Username already exists");
        }
        Student savedStudent = studentRepository.save(newStudent);
        return studentMapper.studentToStudentDTO(savedStudent);
    }

    public List<StudentDTO> getAllStudents() {
        List<Student> studentList = (List<Student>) studentRepository.findAll();
        return studentMapper.studentListToStudentDTOList(studentList);
    }

    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) throws Exception {
        Student student = studentMapper.studentDTOToStudent(studentDTO);
        student.setId(id);
        student.getPerson().setId(getById(id).getPerson().getId());
        Student savedStudent = studentRepository.save(student);
        return studentMapper.studentToStudentDTO(savedStudent);
    }

    public String deleteStudent(Long id) throws Exception {
        Student student;
        student = getById(id);
        studentRepository.delete(student);

        return "Successfully deleted";
    }

    private Student getById(Long id) throws Exception {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if(optionalStudent.isEmpty()) {
            throw new Exception("No student found for given id");
        }
        return optionalStudent.get();
    }
}
