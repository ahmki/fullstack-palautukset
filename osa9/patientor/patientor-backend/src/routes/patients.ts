import express from 'express';
import patientService from '../services/patientService';
import newPatientEntryValidation from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
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