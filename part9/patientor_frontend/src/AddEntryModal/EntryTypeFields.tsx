import React from "react";
import { Field } from "formik";

import { EntryType } from "../types";
import { NumberField, TextField } from "../AddPatientModal/FormField";

interface Props {
  entryType: EntryType;
}

const validateRequired = (value: string) => {
  const requiredError = "Field is required";
  if (!value){
    return requiredError;
  }
};

const validateDate = (value: string) => {
  const dateError = "Enter date in YYYY-MM-DD format";
  if (!value.match(/\w{4}-\w{2}-\w{2}/)){
    return dateError;
  }
};

const EntryTypeFields: React.FC<Props> = ({ entryType }) => {
  switch (entryType) {
    case EntryType.HealthCheck:
      return (
        <Field
          label="Health Check Rating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      );
    case EntryType.OccupationalHealthCare:
      return (
        <>
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
            validate={validateRequired}
          />

          Sick Leave

          <Field
            label="Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
            validate={validateDate}
          />
          <Field
            label="End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
            validate={validateDate}
          />
        </>
      );

    case EntryType.Hospital:
      return (
        <>
          Discharge

          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
            validate={validateDate}
          />
          <Field
            label="Criteria"
            placeholder="Criteria"
            name="discharge.criteria"
            component={TextField}
            validate={validateRequired}
          />
        </>
      );
    default:
      return null;
  }
};

export default EntryTypeFields;