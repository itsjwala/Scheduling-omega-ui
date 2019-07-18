package com.wissen.SmartInterviewProcess.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wissen.SmartInterviewProcess.models.AvailableSlot;

public interface AvailableSlotRepository extends JpaRepository<AvailableSlot, Long> {

	@Query("select e from AvailableSlot e where e.fromTimestamp >= :from and e.toTimestamp<= :to and active= :active and scheduled = :scheduled")
	public List<AvailableSlot> getAllBetween(@Param("from") LocalDateTime fromt, @Param("to") LocalDateTime tot,@Param("scheduled")boolean scheduled,@Param("active") boolean active);
	
	
	public List<AvailableSlot> findByActiveTrue();

}
