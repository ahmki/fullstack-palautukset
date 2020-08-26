export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}


export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  employerName: string;
  sickLeave?: SickLeave;
}

type SickLeave = {
  startDate: string;
  endDate: string;
};

export interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  discharge: Discharge;
}

export type Discharge = {
  date: string;
  criteria: string;
};

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Array<Entry>
}

export type Entry = | HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
  male = "male",
  female = "female",
  other = "other"
}