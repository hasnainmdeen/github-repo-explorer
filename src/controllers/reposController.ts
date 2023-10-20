import { Request, Response } from 'express';
import axios from 'axios';
import { CustomSession } from '../types/types';
import { STATUS_CODE } from '../utils/constants';

export const searchRepos = async (req: Request, res: Response) => {
    
    const query: string = req.query.q as string;
    const userToken: string | undefined = (req.session as CustomSession).githubToken;

    if (!userToken) {
        return res.status(STATUS_CODE.UNAUTHORIZED).json({ error: 'User not authenticated' });
    }

    try {
        const response = await axios.get(`${process.env.GITHUB_API_URL}/search/repositories`, {
            headers: {
                'Authorization': `token ${userToken}`
            },
            params: {
                q: query
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            error: 'Failed to fetch data from GitHub'
        });
    }
};

export const getRepoFile = async (req: Request, res: Response) => {
    const { owner, repo } = req.params;
    const pathArray = req.params[0]?.split('/') || [];
    const path = pathArray.join('/');

    if (!owner || !repo || !path) {
        return res.status(STATUS_CODE.BAD_REQUEST).send('Missing owner, repo, or path parameters.');
    }

    const GITHUB_API_URL = `${process.env.GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`;

    const userToken: string | undefined = (req.session as CustomSession).githubToken;
    if (!userToken) {
        return res.status(STATUS_CODE.UNAUTHORIZED).json({ error: 'User not authenticated' });
    }
    console.log('url: ', `${GITHUB_API_URL}`);

    try {
        
        const response = await axios.get(`${GITHUB_API_URL}`, {
            headers: {
                'Authorization': `token ${userToken}`
            }
        });

        const fileContent = Buffer.from(response.data.content, 'base64').toString('utf8');
        res.send(fileContent);

    } catch (error) {
        if (error instanceof Error && 'response' in error) {
            const axiosError = error as any; // This type assertion is safe now due to the check above
            if (axiosError.response && axiosError.response.status === 404) {
                res.status(STATUS_CODE.NOT_FOUND).send('File not found');
            } else {
                res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send('Failed to fetch file from GitHub');
            }
        } else {
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send('Unknown error occurred.');
        }
    }
};