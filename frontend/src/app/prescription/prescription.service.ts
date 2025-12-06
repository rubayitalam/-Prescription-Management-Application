import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Prescription {
  id?: number;
  prescriptionDate: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  diagnosis?: string;
  medicines?: string;
  nextVisitDate?: string;
}

export interface ReportDTO {
  date: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private apiUrl = 'http://localhost:8080/api/v1/prescription';
  private reportUrl = 'http://localhost:8080/api/v1/report';

  constructor(private http: HttpClient) { }

  getPrescriptions(startDate?: string, endDate?: string, page: number = 0, size: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this.http.get<any>(this.apiUrl, { params });
  }

  getPrescriptionById(id: number): Observable<Prescription> {
    return this.http.get<Prescription>(`${this.apiUrl}/${id}`);
  }

  createPrescription(prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(this.apiUrl, prescription);
  }

  updatePrescription(id: number, prescription: Prescription): Observable<Prescription> {
    return this.http.put<Prescription>(`${this.apiUrl}/${id}`, prescription);
  }

  deletePrescription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDailyReport(): Observable<ReportDTO[]> {
    return this.http.get<ReportDTO[]>(`${this.reportUrl}/daily-count`);
  }
}
