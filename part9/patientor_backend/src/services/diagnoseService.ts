import diagnosis from '../../data/diagnoses';

import { Diagnose } from '../types';

const getEntries = (): Diagnose[] => {
  return diagnosis;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis
};