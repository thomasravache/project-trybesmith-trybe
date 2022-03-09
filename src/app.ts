import express, { Application } from 'express';
import { userRoutes, loginRoutes, productRoutes } from './controllers';
import { inputError, domainError, serverError } from './errors/middlewares';
import authentication from './jwtHandler/middlewares/authentication';

const app: Application = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/login', loginRoutes);

app.use(authentication);
app.use('/products', productRoutes);

/* ERROR MIDDLEWARES */
app.use(inputError);
app.use(domainError);
app.use(serverError);

export default app;
