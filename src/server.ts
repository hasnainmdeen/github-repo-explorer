import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swaggerConfig';
import sessionMiddleware from './middlewares/session';
import authRoutes from './routes/authRoutes';
import favoritesRoutes from './routes/favoritesRoutes';
import reposRoutes from './routes/reposRoutes';
import generalRoutes from './routes/generalRoutes';
import { connectToDatabase } from './config/database';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at: http://localhost:${PORT}`);
    });
    console.log(`Running on ENV = ${process.env.NODE_ENV}`);
});

app.use(express.json());
app.use(morgan('dev'));
app.use(sessionMiddleware);

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(generalRoutes);
app.use(authRoutes);
app.use(favoritesRoutes);
app.use(reposRoutes);

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});