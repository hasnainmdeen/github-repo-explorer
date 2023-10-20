import { Request, Response } from 'express';
import axios from 'axios';
import { CustomSession } from '../types/types';
import { STATUS_CODE } from '../utils/constants';

const { GITHUB_LOGIN_URL, CLIENT_ID, CLIENT_SECRET } = process.env;

export const githubAuth = (req: Request, res: Response) => {
    res.redirect(`${GITHUB_LOGIN_URL}/oauth/authorize?client_id=${CLIENT_ID}`);
};


export const githubCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string;
    try {
        const tokenResponse = await axios.post(`${GITHUB_LOGIN_URL}/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`);
        const accessToken = new URLSearchParams(tokenResponse.data).get('access_token');
        if (accessToken) {
            (req.session as CustomSession).githubToken = accessToken;
            res.send('Authentication successful!');
        } else {
            res.status(STATUS_CODE.BAD_REQUEST).send('Error getting access token');
        }
    } catch (err) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send('Error during authentication');
    }
};
