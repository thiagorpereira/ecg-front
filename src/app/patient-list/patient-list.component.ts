import { Component, OnInit } from '@angular/core';
import { PatientService } from '../shared/service/patient.service';
import { IPatient, IPatientList } from '../shared/models/IPatient';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  patients!: IPatient[];

  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllPatients();
  }

  public getAllPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (data: IPatientList) => {
        console.log('%%data', data);
        this.patients = data && data.patients;
      },
      error: (err: any) => {
        console.log('Erro ao carregar transferencias', err);
      },
    });
  }

  public goToPatientAdd() {
    // this.router.navigate(['/addPatient'], {
    //   relativeTo: this.route,
    // });
    this.router.navigate(['/addPatient'], {
      relativeTo: this.route,
    });
  }

  public goToDetail(item: IPatient) {
    this.router.navigate([`/patient/${item.id}`], {
      relativeTo: this.route,
    });
  }
}
