import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Prescription, PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {
  prescriptions: Prescription[] = [];
  filterForm: FormGroup;

  // Pagination
  page = 0;
  size = 10;
  totalElements = 0;
  totalPages = 0;

  // Modal
  showDeleteModal = false;
  selectedId: number | null = null;

  constructor(
    private prescriptionService: PrescriptionService,
    private fb: FormBuilder
  ) {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.filterForm = this.fb.group({
      startDate: [firstDay.toISOString().split('T')[0]],
      endDate: [lastDay.toISOString().split('T')[0]]
    });
  }

  ngOnInit(): void {
    this.loadPrescriptions();
  }

  loadPrescriptions() {
    const { startDate, endDate } = this.filterForm.value;
    this.prescriptionService.getPrescriptions(startDate, endDate, this.page, this.size)
      .subscribe(response => {
        this.prescriptions = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
      });
  }

  onFilter() {
    this.page = 0;
    this.loadPrescriptions();
  }

  resetFilter() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.filterForm.patchValue({
      startDate: firstDay.toISOString().split('T')[0],
      endDate: lastDay.toISOString().split('T')[0]
    });
    this.onFilter();
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.loadPrescriptions();
  }

  getEndIndex(): number {
    return Math.min((this.page + 1) * this.size, this.totalElements);
  }

  openDeleteModal(id: number) {
    this.selectedId = id;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedId = null;
  }

  confirmDelete() {
    if (this.selectedId) {
      this.prescriptionService.deletePrescription(this.selectedId)
        .subscribe(() => {
          this.closeDeleteModal();
          this.loadPrescriptions();
        });
    }
  }
}
