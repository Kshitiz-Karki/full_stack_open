import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatientInfo, NewPatient, PublicPatient } from '../types';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {  
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({    
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

  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): PublicPatient | undefined => {
  return patients.find(d => d.id === id);
};


export default {
  getEntries,
  getNonSensitivePatientInfo,
  addPatients,
  findById
};