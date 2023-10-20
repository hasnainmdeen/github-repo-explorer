import { Request, Response } from 'express';
import axios from 'axios';
import { CustomSession } from '../types/types';
import { STRINGS, STATUS_CODE } from '../utils/constants';
import { getGitHubOAuthAccessTokenUrl, getGitHubOAuthUrl } from '../utils/urls';

export const githubAuth = (req: Request, res: Response) => {
    res.redirect(getGitHubOAuthUrl());
};


export const githubCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string;
    try {
        const tokenResponse = await axios.post(getGitHubOAuthAccessTokenUrl(code));
        const accessToken = new URLSearchParams(tokenResponse.data).get('access_token');
        if (accessToken) {
            (req.session as CustomSession).githubToken = accessToken;
            res.send(STRINGS.AUTH_SUCCESS);
        } else {
            res.status(STATUS_CODE.BAD_REQUEST).send(STRINGS.ERROR_ACCESS_TOKEN);
        }
    } catch (err) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(STRINGS.ERROR_DURING_AUTH);
    }
};