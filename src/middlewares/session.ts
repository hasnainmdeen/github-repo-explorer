import session, { Session } from 'express-session';
import { CustomSession } from '../types/types';  // assuming you followed the previous suggestion

const sessionMiddleware = session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
});

export default sessionMiddleware;
