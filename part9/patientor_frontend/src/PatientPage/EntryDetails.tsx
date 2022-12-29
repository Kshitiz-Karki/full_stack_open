import { Entry } from "../types";
import { assertNever } from "../utils";

import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthCareEntry from "./OccupationalHealthCareEntry";
import HospitalEntry from "./HospitalEntry";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthCareEntry entry={entry} />;
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;