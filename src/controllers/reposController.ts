import { Request, Response } from 'express';
import axios from 'axios';
import { CustomSession } from '../types/types';
import { STATUS_CODE, STRINGS } from '../utils/constants';
import { getGitHubReposUrl, getGitHubSearchUrl } from '../utils/urls';

const headersTemplate = {
    'Authorization': 'token {userToken}'
};

export const generateHeaders = (userToken: string) => {
    return {
        ...headersTemplate,
        'Authorization': headersTemplate['Authorization'].replace('{userToken}', userToken)
    };
};


export const searchRepos = async (req: Request, res: Response) => {
    
    const query: string = req.query.q as string;
    const userToken: string | undefined = (req.session as CustomSession).githubToken;

    if (!userToken) {
        return res.status(STATUS_CODE.UNAUTHORIZED).json({ error: STRINGS.NOT_AUTHENTICATED });
    }

    try {
        const response = await axios.get(getGitHubSearchUrl(), {
            headers: generateHeaders(userToken),
            params: {
                q: query
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            error: STRINGS.FAILED_TO_FETCH_DATA
        });
    }
};

export const getRepoFile = async (req: Request, res: Response) => {
    const { owner, repo } = req.params;
    const pathArray = req.params[0]?.split('/') || [];
    const path = pathArray.join('/');

    if (!owner || !repo || !path) {
        return res.status(STATUS_CODE.BAD_REQUEST).send(STRINGS.MISSING_SOME_PARAM);
    }

    const userToken: string | undefined = (req.session as CustomSession).githubToken;
    if (!userToken) {
        return res.status(STATUS_CODE.UNAUTHORIZED).json({ error: STRINGS.NOT_AUTHENTICATED });
    }

    try {
        
        const response = await axios.get(getGitHubReposUrl(owner, repo, path), {
            headers: generateHeaders(userToken)
        });

        const fileContent = Buffer.from(response.data.content, 'base64').toString('utf8');
        res.send(fileContent);

    } catch (error) {
        if (error instanceof Error && 'response' in error) {
            const axiosError = error as any; // This type assertion is safe now due to the check above
            if (axiosError.response && axiosError.response.status === 404) {
                res.status(STATUS_CODE.NOT_FOUND).send(STRINGS.FILE_NOT_FOUND);
            } else {
                res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(STRINGS.FAILED_TO_FETCH_FILE);
            }
        } else {
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send(STRINGS.UNKNOWN_ERROR);
        }
    }
};