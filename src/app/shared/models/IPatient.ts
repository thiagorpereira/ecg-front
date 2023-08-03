export interface IPatient {
  id: string;
  name: string;
  birthDate: string;
  cpf: string;
  phone: string;
  createdAt: string;
}

export interface IPatientList {
  patients: IPatient[];
}

export interface IPatientOne {
  patient: IPatient;
}
