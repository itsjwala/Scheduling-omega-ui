package com.wissen.SmartInterviewProcess.repository;

import java.util.Arrays;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.wissen.SmartInterviewProcess.models.Employee;
import com.wissen.SmartInterviewProcess.models.Interviewer;
import com.wissen.SmartInterviewProcess.models.Level;
import com.wissen.SmartInterviewProcess.models.Technology;

@RunWith(SpringRunner.class)
//@DataJpaTest
 @SpringBootTest
// @ActiveProfiles("dev")
public class InterviewerRepoTest {

	@Autowired
	InterviewerRepository repo;

	@Autowired
	LevelRepository levelRepo;
	@Autowired
	TechnologyRepository techRepo;

	@Before
	public void beforeEach() {
//		levelRepo.save(new Level("R1"));
//		techRepo.save(new Technology("Angular"));
//		techRepo.save(new Technology("Java"));	
	}

	@Test
	public void addTest() {
		Employee emp = new Employee();
		emp.setEmail("sadfsdf@sdfg.fg");
		emp.setName("jigar");
		emp.setPhoneNumber("888888888888");
		emp.setWissenId("WT455");

		Interviewer intee = new Interviewer();

		intee.setLevels(levelRepo.findAll());

		intee.setTechnologies(techRepo.findAll());

		intee.setEmp(emp);

		repo.save(intee);
	}
	
	
	@Test
	public void viewTest() {

		System.out.println(repo.findAll());
	}

}
