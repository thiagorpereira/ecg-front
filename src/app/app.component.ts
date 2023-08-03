import { Component } from '@angular/core';
import { PatientService } from './shared/service/patient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ecg-front';

  constructor(private dataService: PatientService) {}

  // getAllPatients() {
  //   this.dataService
  //     .getPatients()
  //     .then((items) => console.log(items))
  //     .catch((error) => console.log(error));
  // }
}
