import React from "react";

import { OccupationalHealthCareEntry as OccupationalHealthCare } from '../types';

import DiagnosisList from "./DiagnosisList";

import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthCareEntry: React.FC<{entry: OccupationalHealthCare}> = ({ entry }) => {
  return (
    <>
      {entry.date} {" "}
      <WorkIcon /> {" "}
      <strong>{entry.employerName}</strong> <br />
      {entry.description}
      {entry.diagnosisCodes && (
        <DiagnosisList diagnosesCodes={entry.diagnosisCodes} />
      )}

      {entry.sickLeave && <strong>Sick Leave: </strong>}
      {entry.sickLeave && entry.sickLeave.startDate} 
      {entry.sickLeave && ` to `}
      {entry.sickLeave && entry.sickLeave.endDate}<br />
      Diagnose by {entry.specialist}
    </>   
  );
};

export default OccupationalHealthCareEntry;