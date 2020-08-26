/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Patient, Gender, Entry, HealthCheckRating, Discharge } from './types';

/*
* VALIDATION FOR PATIENTS
*/

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const newPatientEntryValidation = (object: any): Patient => {
  const newEntry: Patient = {
    id: String(Math.random() * 100000),
    name: parseName(object.name),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entries: object.entries
  };

  return newEntry;
};

// Parse and validate params
const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`incorrect or missing ssn ${ssn}`);
  }
  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`incorrect or missing occupation ${occupation}`);
  }
  return occupation;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`incorrect or missing gender: ${gender}`);
  }

  return gender;
};
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`incorrect or missing date: ${date}`);
  }

  return date;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing name: ${name}`);
  }

  return name;
};

// String, date and enum Gender type guards
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

/*
* VALIDATION FOR ENTRIES
*/

const isEntry = (type: string): boolean => {
  return type === 'HealthCheck' || type === 'Hospital' || type === 'OccupationalHealthCare';
};

const isRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const isDischarge = (discharge: any): boolean => {
  if (!isDate(discharge.date) || !isString(discharge.criteria)) {
    return false;
  }
  return true;
};
/*
* Validates all required fields
*/

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const newEntryValidation = (object: any): Entry => {

  switch (parseEntry(object.type)) {
    case "HealthCheck":
      const newHealthCheckEntry = {
        id: String(Math.random() * 100000),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseName(object.specialist),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: object.type,
        healthCheckRating: parseRating(object.healthCheckRating)
      };
      return newHealthCheckEntry;
    
    case "OccupationalHealthCare":
      const newOccupationalHealthCareEntry = {
        id: String(Math.random() * 100000),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseName(object.specialist),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: object.type,
        employerName: parseName(object.employerName)
      };
      return newOccupationalHealthCareEntry;
    
    case "Hospital":
      const newHospitalEntry = {
        id: String(Math.random() * 100000),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseName(object.specialist),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: object.type,
        discharge: parseDischarge(object.discharge)
      };
      return newHospitalEntry;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return object;
};

const parseEntry = (entry: any): string => {
  if (!entry || !isString(entry) || !isEntry(entry)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing entry type ${entry}`);
  }
  return entry;
};

const parseDescription = (desc: string): string => {
  if (!desc || !isString(desc)) {
    throw new Error(`Incorrect or missing description ${desc}`);
  }
  return desc;
};

const parseRating = (rating: any): HealthCheckRating => {
  if (!rating || !isRating(rating)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing health rating ${rating}`);
  }
  return rating;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge.date || !discharge.criteria || !isDischarge(discharge)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing discharge data ${discharge}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return discharge;
};