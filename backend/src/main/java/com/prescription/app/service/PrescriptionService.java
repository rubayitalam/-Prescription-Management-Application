package com.prescription.app.service;

import com.prescription.app.dto.PrescriptionDTO;
import com.prescription.app.dto.ReportDTO;
import com.prescription.app.entity.Prescription;
import com.prescription.app.repository.PrescriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;

    public Page<PrescriptionDTO> getPrescriptions(LocalDate startDate, LocalDate endDate, Pageable pageable) {
        if (startDate == null) {
            startDate = LocalDate.now().withDayOfMonth(1);
        }
        if (endDate == null) {
            endDate = LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth());
        }
        return prescriptionRepository.findByPrescriptionDateBetween(startDate, endDate, pageable)
                .map(this::convertToDTO);
    }

    public PrescriptionDTO getPrescriptionById(Long id) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));
        return convertToDTO(prescription);
    }

    public PrescriptionDTO createPrescription(PrescriptionDTO dto) {
        Prescription prescription = convertToEntity(dto);
        return convertToDTO(prescriptionRepository.save(prescription));
    }

    public PrescriptionDTO updatePrescription(Long id, PrescriptionDTO dto) {
        Prescription existing = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));

        existing.setPrescriptionDate(dto.getPrescriptionDate());
        existing.setPatientName(dto.getPatientName());
        existing.setPatientAge(dto.getPatientAge());
        existing.setPatientGender(dto.getPatientGender());
        existing.setDiagnosis(dto.getDiagnosis());
        existing.setMedicines(dto.getMedicines());
        existing.setNextVisitDate(dto.getNextVisitDate());

        return convertToDTO(prescriptionRepository.save(existing));
    }

    public void deletePrescription(Long id) {
        prescriptionRepository.deleteById(id);
    }

    public List<ReportDTO> getDailyPrescriptionCount() {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(9); // Last 10 days including today
        List<Object[]> results = prescriptionRepository.countPrescriptionsByDate(startDate, endDate);

        return results.stream()
                .map(obj -> new ReportDTO((LocalDate) obj[0], (Long) obj[1]))
                .collect(Collectors.toList());
    }

    private PrescriptionDTO convertToDTO(Prescription entity) {
        PrescriptionDTO dto = new PrescriptionDTO();
        dto.setId(entity.getId());
        dto.setPrescriptionDate(entity.getPrescriptionDate());
        dto.setPatientName(entity.getPatientName());
        dto.setPatientAge(entity.getPatientAge());
        dto.setPatientGender(entity.getPatientGender());
        dto.setDiagnosis(entity.getDiagnosis());
        dto.setMedicines(entity.getMedicines());
        dto.setNextVisitDate(entity.getNextVisitDate());
        return dto;
    }

    private Prescription convertToEntity(PrescriptionDTO dto) {
        Prescription entity = new Prescription();
        entity.setPrescriptionDate(dto.getPrescriptionDate());
        entity.setPatientName(dto.getPatientName());
        entity.setPatientAge(dto.getPatientAge());
        entity.setPatientGender(dto.getPatientGender());
        entity.setDiagnosis(dto.getDiagnosis());
        entity.setMedicines(dto.getMedicines());
        entity.setNextVisitDate(dto.getNextVisitDate());
        return entity;
    }
}
