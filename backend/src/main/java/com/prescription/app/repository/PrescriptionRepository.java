package com.prescription.app.repository;

import com.prescription.app.entity.Prescription;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

    Page<Prescription> findByPrescriptionDateBetween(LocalDate startDate, LocalDate endDate, Pageable pageable);

    @Query("SELECT p.prescriptionDate, COUNT(p) FROM Prescription p WHERE p.prescriptionDate BETWEEN :startDate AND :endDate GROUP BY p.prescriptionDate ORDER BY p.prescriptionDate ASC")
    List<Object[]> countPrescriptionsByDate(@Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
}
