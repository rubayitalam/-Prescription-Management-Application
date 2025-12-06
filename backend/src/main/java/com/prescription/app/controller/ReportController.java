package com.prescription.app.controller;

import com.prescription.app.dto.ReportDTO;
import com.prescription.app.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/report")
@RequiredArgsConstructor
public class ReportController {

    private final PrescriptionService prescriptionService;

    @GetMapping("/daily-count")
    public ResponseEntity<List<ReportDTO>> getDailyPrescriptionCount() {
        return ResponseEntity.ok(prescriptionService.getDailyPrescriptionCount());
    }
}
