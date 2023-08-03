import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { PatientService } from '../shared/service/patient.service';

// import { NgxMaskModule } from '@ngx-mask/core';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css'],
})
export class PatientAddComponent implements OnInit {
  constructor(
    private patientService: PatientService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  goBack(): void {
    this.location.back();
  }

  formClient!: FormGroup;

  private createForm() {
    this.formClient = new FormGroup({
      name: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{8}$/),
      ]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{11}$/),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{11}$/),
      ]),
    });
  }

  parseDate(dateString: string): Date {
    const day = parseInt(dateString.substr(0, 2), 10);
    const month = parseInt(dateString.substr(2, 2), 10);
    const year = parseInt(dateString.substr(4, 4), 10);
    return new Date(year, month - 1, day);
  }

  public savePatient() {
    console.log('Dados@@', this.formClient.value);
    if (!this.formClient.valid) {
      this.formClient.markAllAsTouched();
      return;
    } else {
      var pacient = this.formClient.value;
      pacient.birthDate = this.parseDate(pacient.birthDate);
      this.patientService.createPatient(pacient).subscribe({
        next: (data: any) => {
          alert('Paciente salvo');
        },
        error: (err: any) => {
          console.log('Erro ao carregar transferencias', err);
          alert(err?.error.error || 'Erro');
        },
      });
    }
  }
}
