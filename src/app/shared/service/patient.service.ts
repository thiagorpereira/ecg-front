// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class PatientService {
//   private apiUrl = 'https://ecg-api.onrender.com/patients';

//   constructor(private http: HttpClient) {}

//   getAll(): Observable<any> {
//     return this.http.get<any>(this.apiUrl);
//   }

//   // getAll2() {
//   //   return this.httpClient.get<any>(this.apiUrl).toPromise();
//   // }
// }

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Transferencia } from "../models/transferencia";
import { environment } from 'src/environments/environment';
import { IPatient, IPatientList, IPatientOne } from '../models/IPatient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  public patientAux: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public getPatients(): Observable<IPatientList> {
    const response = this.http.get<IPatientList>(
      `${environment.apiUrl}patients`
    );
    return response;
  }

  public getPatientsById(id: number): Observable<IPatientOne> {
    return this.http.get<IPatientOne>(`${environment.apiUrl}patients/${id}`);
  }

  public createPatient(patient: IPatient): Observable<IPatient> {
    return this.http.post<IPatient>(`${environment.apiUrl}patients`, patient);
  }

  public getOne(): Subject<any> {
    console.log('GET ONE CHEGOU');
    return this.patientAux;
  }
}
