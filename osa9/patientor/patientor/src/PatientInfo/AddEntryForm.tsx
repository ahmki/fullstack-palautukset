import { Entry } from '../types';
import React from 'react';
// import { Formik } from 'formik';

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AddEntryForm: React.FC<Props> = ({ onSubmit }) => {
  return (
    <div>
      test
    </div>
  );
};