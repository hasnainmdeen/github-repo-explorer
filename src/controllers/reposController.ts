import { Request, Response } from 'express';
import axios from 'axios';
import { CustomSession } from '../types/types';

export const searchRepos = async (req: Request, res: Response) => {
    
    const query: string = req.query.q as string; // This is the search query string from the client
    const userToken: string | undefined = (req.session as CustomSession).githubToken;

    if (!userToken) {
        return res.status(401).json({ error: 'User not authenticated' });
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
        res.status(500).json({
            error: 'Failed to fetch data from GitHub'
        });
    }
};

export const getRepoFile = async (req: Request, res: Response) => {
  console.log(req.params);
    const owner = req.params.owner;
    const repo = req.params.repo;
    const pathArray = req.params[0]?.split('/') || [];
    const path = pathArray.join('/');

    if (!owner || !repo || !path) {
        return res.status(400).send('Missing owner, repo, or path parameters.');
    }

    const GITHUB_API_URL = `${process.env.GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`;

    // Authentication
    const userToken: string | undefined = (req.session as CustomSession).githubToken;
    if (!userToken) {
        return res.status(401).json({ error: 'User not authenticated' });
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
        //console.log(error);
        if (error instanceof Error && 'response' in error) {
            const axiosError = error as any; // This type assertion is safe now due to the check above
            if (axiosError.response && axiosError.response.status === 404) {
                res.status(404).send('File not found');
            } else {
                res.status(500).send('Failed to fetch file from GitHub');
            }
        } else {
            res.status(500).send('Unknown error occurred.');
        }
    }
};