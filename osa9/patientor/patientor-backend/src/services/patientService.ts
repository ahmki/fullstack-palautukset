import patientData from '../../data/patients.json';
import { Patient } from '../types';
import newPatientEntryValidation from '../utils';


const patientEntries: Patient[] = patientData.map(obj => {
  const object = newPatientEntryValidation(obj);
  object.id = obj.id;
  return object;
});

const getPatients = (): Omit<Patient, "ssn">[] => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: Patient): Patient => {

  const newPatient = {
    id: patient.id,
    name: patient.name,
    ssn: patient.ssn,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation
  };
  patientEntries.push(newPatient);
  
  return newPatient;
};

export default {
  getPatients,
  addPatient
}; 