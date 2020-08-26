import React from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';

import { apiBaseUrl } from '../constants';
import { Patient, Entry } from '../types';
import { useStateValue, addFetchedPatient } from '../state';
import { Message } from 'semantic-ui-react';

import EntryDetails from './EntryDetails';

const PatientInfo: React.FC = () => {
  const [{ fetchedPatient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    
    const getPatientById = async () => {
  
      try {
        const { data: newPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(addFetchedPatient(newPatient));
      }
      catch (err) {
        console.error(err);
      }
    };
    getPatientById();
  }, [id, dispatch]);

  const getDiagnoseName = (code: string) => {
    const description = diagnoses.find(diagnose => diagnose.code === code);
    return (<div>{description?.name}</div>);
  };

  return (
    <div>
      {Object.values(fetchedPatient).map((patient: Patient) => (
        <Message info key={patient.id}>
          <Message.Header>{patient.name}</Message.Header>
          <Message.List>
            <Message.Item>ssn: {patient.ssn}</Message.Item>
            <Message.Item>occupation: {patient.occupation}</Message.Item>
          </Message.List>
          <Message.Header>entries</Message.Header>
          {Object.values(patient.entries).map((entry: Entry) => (
            <Message.List key={entry.id}>
              <EntryDetails entry={entry} />
              {(entry.diagnosisCodes)?.map((code, i) => (
                <Message.Item key={i}>{code} {getDiagnoseName(code)}</Message.Item>
              ))}
            </Message.List>
          ))}

        </Message>
      ))}

      
    </div>
  );
};
  

export default PatientInfo;