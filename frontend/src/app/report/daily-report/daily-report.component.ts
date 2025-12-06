import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PrescriptionService } from '../../prescription/prescription.service';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css']
})
export class DailyReportComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0,
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Prescriptions Count', backgroundColor: '#0d6efd' }
    ]
  };

  constructor(private prescriptionService: PrescriptionService) { }

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport() {
    this.prescriptionService.getDailyReport().subscribe(data => {
      this.barChartData.labels = data.map(d => d.date);
      this.barChartData.datasets[0].data = data.map(d => d.count);
      this.chart?.update();
    });
  }
}
