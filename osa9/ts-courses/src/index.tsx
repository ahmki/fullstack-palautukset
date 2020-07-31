import React from "react";
import ReactDOM from "react-dom";
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
} 
interface CoursePartBaseDesc extends CoursePartBase {
  description: string;
}
interface CoursePartOne extends CoursePartBaseDesc {
  name: "Fundamentals";
} 
interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
} 
interface CoursePartThree extends CoursePartBaseDesc {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
} 
interface CoursePartFour extends CoursePartBaseDesc {
  name: "Working with an existing codebase";
  rating: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Working with an existing codebase",
      exerciseCount: 4,
      description: "very cool",
      rating: 4
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));