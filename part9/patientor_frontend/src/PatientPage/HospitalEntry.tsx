import React from "react";

import { HospitalEntry as Hospital } from '../types';

import DiagnosisList from "./DiagnosisList";

const HospitalEntry: React.FC<{ entry: Hospital }> = ({ entry }) => {
  return (
    <>
      {entry.date} <br />
      {entry.description}
      {entry.diagnosisCodes && (
        <DiagnosisList diagnosesCodes={entry.diagnosisCodes} />
      )}
      Discharged on {entry.discharge.date} <br />
      {entry.discharge.criteria} <br />
      Diagnose by {entry.specialist}
    </>     
  );
};

export default HospitalEntry;