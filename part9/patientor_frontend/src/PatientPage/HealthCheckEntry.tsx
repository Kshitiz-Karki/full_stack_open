import React from "react";

import { HealthCheckEntry as HealthCheck } from '../types';

import HealthRatingBar from "../components/HealthRatingBar";
import DiagnosisList from "./DiagnosisList";

import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const HealthCheckEntry: React.FC<{ entry: HealthCheck }> = ({ entry }) => {
  return (
    <>
      {entry.date} {" "} <MedicalServicesIcon /><br />
      {entry.description}
      {entry.diagnosisCodes && (
        <DiagnosisList diagnosesCodes={entry.diagnosisCodes} />
      )}
    
      <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
      Diagonose by {entry.specialist}
    </>
  );
};

export default HealthCheckEntry;