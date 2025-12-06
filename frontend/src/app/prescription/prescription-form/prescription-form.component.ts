import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrls: ['./prescription-form.component.css']
})
export class PrescriptionFormComponent implements OnInit {
  prescriptionForm: FormGroup;
  isEditMode = false;
  prescriptionId: number | null = null;
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private prescriptionService: PrescriptionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.prescriptionForm = this.fb.group({
      prescriptionDate: [new Date().toISOString().split('T')[0], Validators.required],
      patientName: ['', Validators.required],
      patientAge: ['', [Validators.required, Validators.min(0)]],
      patientGender: ['', Validators.required],
      diagnosis: [''],
      medicines: [''],
      nextVisitDate: ['']
    });
  }

  ngOnInit(): void {
    this.prescriptionId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.prescriptionId) {
      this.isEditMode = true;
      this.loadPrescription(this.prescriptionId);
    }
  }

  get f() { return this.prescriptionForm.controls; }

  loadPrescription(id: number) {
    this.prescriptionService.getPrescriptionById(id).subscribe(response => {
      this.prescriptionForm.patchValue(response);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.prescriptionForm.invalid) {
      return;
    }

    this.loading = true;
    const prescription = this.prescriptionForm.value;

    if (this.isEditMode && this.prescriptionId) {
      this.prescriptionService.updatePrescription(this.prescriptionId, prescription)
        .subscribe({
          next: () => this.router.navigate(['/prescriptions']),
          error: () => this.loading = false
        });
    } else {
      this.prescriptionService.createPrescription(prescription)
        .subscribe({
          next: () => this.router.navigate(['/prescriptions']),
          error: () => this.loading = false
        });
    }
  }
}
