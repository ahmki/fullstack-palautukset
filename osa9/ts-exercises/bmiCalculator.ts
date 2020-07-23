interface bmiValues {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number): string => {
  const heightFixed = height / 100;
  const bmi: number = weight / (heightFixed * heightFixed);
  
  switch (true) {
    case (bmi > 25):
      return 'Overweight';
    case (bmi > 18.5):
      return 'healthy weight';
    case (bmi > 16):
      return 'underweight';
    case (bmi > 15):
      return 'severely underweight';
    default: return 'very severely underweight';
  }
};

const parseArgs = (args: Array<string>): bmiValues => {
  if (args.length < 4 || args.length > 4) {
    throw new Error('invalid amount of arguments');
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  }
  else {
    throw new Error('arguments must be numbers');
  }
};

try {
  const { height, weight } = parseArgs(process.argv);
  console.log(calculateBmi(height, weight));
}
catch (err) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error:', err.message);
}