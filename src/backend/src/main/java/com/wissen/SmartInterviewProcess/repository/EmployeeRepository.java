package com.wissen.SmartInterviewProcess.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wissen.SmartInterviewProcess.models.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

}
