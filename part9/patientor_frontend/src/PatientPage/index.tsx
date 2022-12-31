import React from "react";
import { useEffect } from "react";

import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Patient, NewEntry, EntryType } from "../types";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { setPatient } from '../state/reducer';

import EntryDetails from './EntryDetails';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { Button } from "@material-ui/core";
import AddEntryModal from '../AddEntryModal';



const PatientPage = () => {

    const [ { patients } , dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    ////////////////////////////
    const submitNewEntry = async (values: NewEntry) => {
    const body = { ...values };

    if (body.type === EntryType.OccupationalHealthCare) {
      if (!body.sickLeave?.endDate && !body.sickLeave?.startDate) {
        body.sickLeave = undefined;
      }
    }

    try {
      const { data: returnedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        body
      );
      dispatch(setPatient(returnedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data);

      let errorMessage = "Something went wrong!";

      if (e.response?.status >= 400 && e.response?.status < 500) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        errorMessage = e.response.data.error;
      }

      setError(errorMessage);
    }
  };



    ///////////////////////////
    
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        const fetchPatient = async ()   => {
            try {
            const { data: patientFromApi } = await axios.get<Patient>(
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `${apiBaseUrl}/patients/${id}`
            );
            dispatch(setPatient(patientFromApi));
            } catch (error: unknown) {
            let errorMessage = 'Something went wrong.';
            if(axios.isAxiosError(error) && error.response) {
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                errorMessage += ' Error: ' + error.response.data.message;
            }
            console.error(errorMessage);
            }
        };
        void fetchPatient();
    }, [id]);

   // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
   const patient = patients[`${id}`];

   const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            <h2>
                {patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
            </h2>
            <p><b>ssn:</b> {patient.ssn}</p>
            <p><b>occupation:</b> {patient.occupation}</p>

            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>

            {patient.entries && patient.entries.length > 0 && <h2>Entries</h2>}
            { patient.entries &&
                <Box sx={{ width: '100%' }}>
                    <Stack spacing={2}>
                        {patient.entries.map(entry => (
                            <Item sx={{ border: 2}} key={entry.id}>
                                <EntryDetails  entry={entry} />
                            </Item> ))}
                    </Stack>
                </Box>
            }  
        </>
    );
};

export default PatientPage;