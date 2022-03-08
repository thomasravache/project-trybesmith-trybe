import express, { Application } from 'express';
import { userRoutes } from './controllers';
import { inputError } from './errors/middlewares';

const app: Application = express();

app.use(express.json());

app.use('/users', userRoutes);

/* ERROR MIDDLEWARES */
app.use(inputError);

export default app;
