import express, { Application } from 'express';
import { userRoutes, loginRoutes } from './controllers';
import { inputError, domainError, serverError } from './errors/middlewares';

const app: Application = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/login', loginRoutes);

/* ERROR MIDDLEWARES */
app.use(inputError);
app.use(domainError);
app.use(serverError);

export default app;
