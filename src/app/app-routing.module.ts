import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientAddComponent } from './patient-add/patient-add.component';

// path: '', redirectTo: '/normas', pathMatch: 'full'},
//   {path: 'normas', component: NormasListagemComponent},

const routes: Routes = [
  {
    path: '',
    redirectTo: '/patientList',
    pathMatch: 'full',
  },
  { path: 'patientList', component: PatientListComponent },
  { path: 'patient/:id', component: PatientDetailComponent },
  { path: 'addPatient', component: PatientAddComponent },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
