import patientData from '../../data/patients';
import { Patient, PublicPatient, Entry } from '../types';
import { newPatientEntryValidation } from '../utils';


const patientEntries: Patient[] = patientData.map(obj => {
  const object = newPatientEntryValidation(obj);
  object.id = obj.id;
  return object;
});

const getPatients = (): PublicPatient[] => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): Patient => {
  const patients: Patient[] = patientEntries.map(
    ({ id, ssn, name, dateOfBirth, gender, occupation, entries }) => ({
      id, ssn, name, dateOfBirth, gender, occupation, entries
    }));

  const patient = patients.find(patient => patient.id === id);

  if (patient) {
    return patient;
  }
  else {
    throw new Error(`Could not find patient ${id}`);
  }
};

const addPatient = (patient: Patient): Patient => {

  const newPatient = {
    id: patient.id,
    name: patient.name,
    ssn: patient.ssn,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: []
  };
  patientEntries.push(newPatient);
  
  return newPatient;
};

const addEntryForPatient = (patient: Patient, entry: Entry): Patient => {
 
  const iOfPatient = patientEntries.findIndex(p => p.id === patient.id);

  (patientEntries[iOfPatient].entries).push(entry);

  // const updatedPatientEntries = patientEntries.map(p => {
  //   return p.id === updatedPatient.id
  //     ? updatedPatient
  //     : p;
  // });

  return patientEntries[iOfPatient];
};

export default {
  getPatients,
  addPatient,
  getPatientById,
  addEntryForPatient
}; 