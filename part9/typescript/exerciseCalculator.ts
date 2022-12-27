interface exerciseReport { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface trainingDetails {
    schedule: Array<number>,
    target: number
}

const parseExerciseCalcArguments = (args: Array<string>): trainingDetails => {
  if (args.slice(2).length < 2) throw new Error('Not enough arguments');

  if (args.slice(2).every(elem => !isNaN(Number(elem)))) {
    return {
      schedule: args.slice(3).map(elem => Number(elem)),
      target: Number(args[2])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (schedule: Array<number>, target: number) : exerciseReport => {

    const trainingPeriod = schedule.length;
    const avgExerciseHrs = schedule.reduce((accumulator, elem) =>  accumulator + elem, 0) / trainingPeriod;

    let rating: number;
    let ratingDesc: string;

    if (avgExerciseHrs < 1){
        rating = 1;
        ratingDesc = 'Way to go, Try harder !!';
    }
    else if (avgExerciseHrs >= 1 && avgExerciseHrs < 2) {
        rating = 2;
        ratingDesc = 'Not too bad but could be better !!';
    }
    else {
        rating = 3;
        ratingDesc = 'Excellent, keep up the hard work !!';
    }

    return {
        periodLength: trainingPeriod,
        trainingDays: schedule.filter(elem => elem !== 0).length,
        success: avgExerciseHrs >= target ? true : false,
        rating: rating,
        ratingDescription: ratingDesc,
        target: target,
        average: avgExerciseHrs
    };
};

if (!process.argv.includes('index.ts')) {
try {
  const { schedule, target } = parseExerciseCalcArguments(process.argv);
  console.log(calculateExercises(schedule, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
}