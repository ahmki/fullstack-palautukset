/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Patient, Gender } from './types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const newPatientEntryValidation = (object: any): Patient => {
  const newEntry: Patient = {
    id: String(Math.random() * 100000),
    name: parseName(object.name),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDate(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
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

export default newPatientEntryValidation;