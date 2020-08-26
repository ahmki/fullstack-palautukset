import express from 'express';
import patientService from '../services/patientService';
import { newPatientEntryValidation, newEntryValidation } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  try {
    res.send(patientService.getPatientById(req.params.id));
  }
  catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(err.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const targetPatient = patientService.getPatientById(req.params.id);
    const entry = newEntryValidation(req.body);
    res.send(patientService.addEntryForPatient(targetPatient, entry));
  }
  catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(err.message);
  }
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatientEntry = newPatientEntryValidation(req.body);

    const newPatient = patientService.addPatient(newPatientEntry);
    res.json(newPatient);

  }
  catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(err.message);
  }
});


export default router;