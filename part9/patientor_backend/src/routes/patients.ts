import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientInfo());
});

router.post('/', (_req, res) => {
    try {
        const newPatient = toNewPatient(_req.body);
        const addedPatient = patientService.addPatients(newPatient);
        res.json(addedPatient);
    } 
    catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    } 
  
});

router.get('/:id', (_req, res) => {
  const patient = patientService.findById(_req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

export default router;