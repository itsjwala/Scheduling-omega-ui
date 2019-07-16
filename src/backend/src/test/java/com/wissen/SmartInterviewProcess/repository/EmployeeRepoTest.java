package com.wissen.SmartInterviewProcess.repository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.wissen.SmartInterviewProcess.models.Employee;

@RunWith(SpringRunner.class)
@DataJpaTest
public class EmployeeRepoTest {

	
	
	@Autowired
	EmployeeRepository emprepo;
	
	@Test
	public void addEmployee() {
		Employee emp = new Employee();
		emp.setEmail("sadfsdf@sdfg.fg");
		emp.setName("jigar");
		emp.setPhoneNumber("888888888888");
		emp.setWissenId("WT455");
		
		emprepo.save(emp);
	}
	
	
}
