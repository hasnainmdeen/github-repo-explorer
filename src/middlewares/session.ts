import session from 'express-session';

const sessionMiddleware = session({
    secret: 'some_secret',
    resave: false,
    saveUninitialized: true,
});

export default sessionMiddleware;