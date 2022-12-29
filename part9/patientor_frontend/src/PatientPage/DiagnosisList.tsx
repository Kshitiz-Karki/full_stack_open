import React from "react";
import { uid } from "react-uid";

import { useStateValue } from "../state";
import { Diagnosis } from "../types";

interface DiagnosesDetailsProps {
  diagnosesCodes: Array<Diagnosis["code"]>;
}
const DiagnosisList: React.FC<DiagnosesDetailsProps> = ({ diagnosesCodes }) => {
  const [{ diagnoses }] = useStateValue();
  
  return (
    <>
      <p>
        <strong>{diagnosesCodes.length > 1 ? "Diagnoses" : "Diagnosis"}</strong>
      </p>
      
      <ul>
        {diagnosesCodes.map(code => (
          <li key={uid({})}>
              <strong>{code} - </strong>
              {diagnoses[code] && diagnoses[code].name}
          </li>
        ))}
    </ul>
    </>            
  );
};

export default DiagnosisList;