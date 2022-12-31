import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatientInfo, NewPatient, NewEntry, Entry } from '../types';

let updatedPatients = [...patients];

const getEntries = (): Patient[] => {
  return updatedPatients;
};

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {  
  return updatedPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({    
    id,    
    name,    
    dateOfBirth,    
    gender,
    occupation,
  })); 
};

const addPatients = (patient: NewPatient) : Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient  
  };

  updatedPatients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  return updatedPatients.find(d => d.id === id);
};

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
  const entry: Entry = { ...newEntry, id: uuid() };
  const savedPatient = { ...patient, entries: patient.entries.concat(entry) };
  updatedPatients = updatedPatients.map((p) =>
    p.id === savedPatient.id ? savedPatient : p
  );

  return savedPatient;
};



export default {
  getEntries,
  getNonSensitivePatientInfo,
  addPatients,
  findById,
  addEntry
};