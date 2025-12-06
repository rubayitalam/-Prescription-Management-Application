package com.prescription.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ReportDTO {
    private LocalDate date;
    private Long count;
}
