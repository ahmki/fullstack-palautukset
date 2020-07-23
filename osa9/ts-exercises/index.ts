/* eslint-disable @typescript-eslint/no-explicit-any */

// had to disable unsafe member access so I could handle request.body
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

// aleksi.heinimaki1@gmail.com
// exercises 9.1 - 9.7

import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
import express from 'express';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('HELLO FULL STACK');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi: string = calculateBmi(height, weight);
  
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  else {
    const resObject = {
      weight: weight,
      height: height,
      bmi: bmi
    };
    res.json(resObject);
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateNumberArray = (array: any[]): boolean => {
  return array.every(n => !isNaN(Number(n)));
};

app.post('/exercises', (req, res) => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const exercises: any = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const target: any = req.body.target;

  if (!exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  }

  if (validateNumberArray(exercises) && !isNaN(Number(target))) {
    const exerciseRating = exerciseCalculator(exercises, target);
    res.json(exerciseRating);
  }

  else {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});