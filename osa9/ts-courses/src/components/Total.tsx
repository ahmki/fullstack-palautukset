import React from 'react';

type Course = {
  name: string,
  exerciseCount: number
}

interface TotalProps {
  courseParts: Array<Course>;
}

const Total: React.FC<TotalProps> = ({ courseParts }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
};

export default Total;