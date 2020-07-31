import React from 'react';
import { CoursePart } from '../index';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      <Part courses={courseParts} />
    </div>
  )
};

export default Content;