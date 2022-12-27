import express from 'express';
const app = express();
app.use(express.json());

import calculateBmi  from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    
    if (isNaN(Number(_req.query.height)) || isNaN(Number(_req.query.weight)) || _req.query.height === '' || _req.query.weight === ''){
        return res.status(400).json({
            error: "malformatted parameters"
        });
    }

    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);
    return res.json({
        weight: weight,
        height: height,
        bmi: calculateBmi(height, weight)
    });

});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    
    if (!daily_exercises || !target) {
        return res.status(400).send({
            error: "parameters missing"
        });
    }

    if ( 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        daily_exercises.every((elem: number) => isNaN(Number(elem))) || isNaN(Number(target))) {
        return res.status(400).send({
            error: "malformatted parameters"
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return res.send(calculateExercises(daily_exercises, target));

});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});