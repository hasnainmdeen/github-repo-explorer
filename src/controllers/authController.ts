import { Request, Response } from 'express';
import axios from 'axios';
import { CustomSession } from '../types/types';

export const githubAuth = (req: Request, res: Response) => {
    res.redirect(`${process.env.GITHUB_LOGIN_URL}/oauth/authorize?client_id=${process.env.CLIENT_ID}`);
};


export const githubCallback = async (req: Request, res: Response) => {
    // console.log(GITHUB_CLIENT_ID);

    const code = req.query.code as string;
    try {
        const tokenResponse = await axios.post(`${process.env.GITHUB_LOGIN_URL}/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`);
        const accessToken = new URLSearchParams(tokenResponse.data).get('access_token');
        if (accessToken) {
            (req.session as CustomSession).githubToken = accessToken;
            res.send('Authentication successful!');
        } else {
            res.status(400).send('Error getting access token');
        }
    } catch (err) {
        res.status(500).send('Error during authentication');
    }
};
