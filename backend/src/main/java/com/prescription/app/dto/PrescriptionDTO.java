package com.prescription.app.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Data
public class PrescriptionDTO {
    private Long id;

    @NotNull(message = "Prescription Date is mandatory")
    private LocalDate prescriptionDate;

    @NotBlank(message = "Patient Name is mandatory")
    private String patientName;

    @NotNull(message = "Patient Age is mandatory")
    @Min(value = 0, message = "Age must be positive")
    @Max(value = 150, message = "Age must be realistic")
    private Integer patientAge;

    @NotBlank(message = "Gender is mandatory")
    private String patientGender;

    private String diagnosis;
    private String medicines;
    private LocalDate nextVisitDate;
}
