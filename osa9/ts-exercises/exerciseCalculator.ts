
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Data {
  exercises: number[],
  target: number
}

export const exerciseCalculator = (exercises: number[], target: number): Result => {

  const exerciseData = exercises.map(n => Number(n));

  const periodLength: number = exerciseData.length;
  const trainingDays: number = (exerciseData.filter(day => day !== 0)).length;
  const average: number = exerciseData.reduce((a, b) => a + b) / periodLength;
  const success = average >= target ? true : false;
  
  const ratePeriod = (average: number, target: number): number => {
    const ratingScale = target - average;

    if (ratingScale <= 0) {
      return 3;
    }
    else if (ratingScale > 0 && ratingScale < 1) {
      return 2;
    }
    else {
      return 1;
    }
  };

  const rating = ratePeriod(average, target);
  const ratingDescription =
    rating === 1 ? 'disappointing' :
      rating === 2 ? 'not great not terrible' :
        'very nice';
  
  const sessionResults: Result = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
  return sessionResults;
};

const parseExerciseArgs = (args: Array<string>): Data => {
  const relevantArgs = args.slice(2);

  // check that every number in argument array is a number
  const validNumbers = relevantArgs.every(n => {
    return !isNaN(Number(n));
  });

  const argsAsNumbers = relevantArgs.map(n => Number(n));

  if (validNumbers) {
    return {
      exercises: argsAsNumbers.slice(1),
      target: argsAsNumbers[0]
    };
  }
  else {
    throw new Error('arguments must be numbers');
  }
};

try {
  const { exercises, target } = parseExerciseArgs(process.argv);
  console.log(exerciseCalculator(exercises, target));
}
catch (err) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('error:', err.message);
}