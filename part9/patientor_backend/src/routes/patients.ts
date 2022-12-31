import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from "../utils";

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

router.post("/:id/entries", (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    try {
      const newEntry = toNewEntry(req.body);
      const updatedPatient = patientService.addEntry(patient, newEntry);
      res.json(updatedPatient);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      res.status(400).send({ error: e.message });
    }
  } else {
    res.status(404).send({ error: "Patient does not exist !!" });
  }
});

export default router;