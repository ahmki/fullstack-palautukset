import React from 'react';
import { CoursePart } from '../index';

const SwitchPart: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return <p>{part.name} {part.exerciseCount} {part.description}</p>
    case "Using props to pass data":
      return <p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>
    case "Deeper type usage":
      return <p>{part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}</p>
    case "Working with an existing codebase":
      return <p>{part.name} {part.exerciseCount} {part.description} {part.rating} </p>
    default:
      return assertNever(part);
  };
};

const Part: React.FC<{ courses: CoursePart[] }> = ({ courses }) => {

  const courseParts = courses.map(part => {
    return (
      <div key={part.name}>
        <SwitchPart part={part} />
      </div>
    )
  });
  return <div>{courseParts}</div>;
};

const assertNever = (value: never): never => {
  throw new Error(`unhandled ${JSON.stringify(value)}`);
};


export default Part;