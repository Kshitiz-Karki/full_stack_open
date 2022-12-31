import React, { useState, useCallback } from "react";

import { EntryType, NewEntry } from "../types";

import AddEntryForm from "./AddEntryForm";

import { Grid } from "@material-ui/core";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const baseInitialValues = {
  description: "",
  date: "",
  specialist: "",
};

const healthCheckInitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.HealthCheck,
  healthCheckRating: 0,
};

const occupationalHealthCareIntitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.OccupationalHealthCare,
  employerName: "",
  sickLeave: { startDate: "", endDate: "" },
};

const hospitalIntitialValues: NewEntry = {
  ...baseInitialValues,
  type: EntryType.Hospital,
  discharge: { date: "", criteria: "" },
};

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const AddEntryFormWrapper: React.FC<Props> = ({ onCancel, onSubmit }) => {

  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);

  const entryForm = useCallback(() => {
    switch (entryType) {
      case EntryType.HealthCheck:
        return (
          <AddEntryForm
            initialValues={healthCheckInitialValues}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      case EntryType.OccupationalHealthCare:
        return (
          <AddEntryForm
            initialValues={occupationalHealthCareIntitialValues}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      case EntryType.Hospital:
        return (
          <AddEntryForm
            initialValues={hospitalIntitialValues}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      default:
        return null;
    }
  }, [entryType, onCancel, onSubmit]);

  return (
    <>
      <form>  
          <Grid item>
          <FormControl>
            <Select
              name="type"
              value={entryType}
              onChange={(e) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                setEntryType(e.target.value as EntryType);
              }}
            >
              <MenuItem key={EntryType.HealthCheck} value={EntryType.HealthCheck}>
                HealthCheck
              </MenuItem>
              <MenuItem key={EntryType.OccupationalHealthCare} value={EntryType.OccupationalHealthCare}>
                OccupationalHealthCare
              </MenuItem>
              <MenuItem key={EntryType.Hospital} value={EntryType.Hospital}>
                Hospital
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </form>
       
      {entryForm()}
          
    </>
  );
};

export default AddEntryFormWrapper;