import { Entry } from "../types";
import React from "react";
import { Icon, Message } from "semantic-ui-react";

const assertNever = (value: never): never => {
  throw new Error(`unhandled ${JSON.stringify(value)}`);
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    
  switch (entry.type) {
    case "HealthCheck":
      return (
        <Message icon info floating>
          <Message.Header as='h4'>{entry.date} </Message.Header>
          <Icon name='user md' />
          <Message.Content>{entry.description} <br /> health rating: {entry.healthCheckRating} </Message.Content>
        </Message>
      );
    case "Hospital":
      return (
        <Message icon info floating>
          <Message.Header as='h4'>{entry.date} </Message.Header>
          <Icon name='hospital outline' />
          <Message.Content>{entry.description} <br /> discharged: {entry.discharge.date} </Message.Content>
        </Message>
      );
    case "OccupationalHealthcare":
      return (
        <Message icon info floating>
          <Message.Header as='h4'>{entry.date}</Message.Header>
          <Icon name='stethoscope' />
          <Message.Content>employer: {entry.employerName}<br />{entry.description} <br /> </Message.Content>
        </Message>
      );
    default:
      return assertNever(entry);
  }
};


export default EntryDetails;