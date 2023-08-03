import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../shared/service/patient.service';
import { IPatient, IPatientOne } from '../shared/models/IPatient';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css'],
})
export class PatientDetailComponent implements OnInit {
  patientId!: number;
  patient!: IPatient;
  today: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private datePipe: DatePipe,
    private location: Location
  ) {
    this.patientId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getOne();
  }

  goBack(): void {
    this.location.back();
  }

  public getOne() {
    this.patientService.getPatientsById(this.patientId).subscribe({
      next: (data: IPatientOne) => {
        this.patient = data.patient;
      },
      error: (err: any) => {
        alert('Erro no servidor, tente novamente');
      },
    });
  }

  formatDate(): string | null {
    return this.datePipe.transform(this?.patient?.birthDate, 'dd/MM/yyyy');
  }

  todayFormatted(): string | null {
    return this.datePipe.transform(this.today, 'dd/MM/yyyy');
  }
}
