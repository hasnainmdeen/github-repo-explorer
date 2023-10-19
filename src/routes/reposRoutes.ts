import express from 'express';
import { searchRepos, getRepoFile } from '../controllers/reposController';

const router = express.Router();

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search repositories.
 *     tags:
 *       - Repositories
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query string.
 *     responses:
 *       200:
 *         description: Successfully fetched repository data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: User not authenticated.
 *       500:
 *         description: Failed to fetch data from GitHub.
 */
router.get('/search', searchRepos);

/**
 * @swagger
 * /repos/{owner}/{repo}/{path}:
 *   get:
 *     summary: Retrieve the content of a file from a specific GitHub repository.
 *     tags:
 *       - Repositories
 *     parameters:
 *       - in: path
 *         name: owner
 *         schema:
 *           type: string
 *         required: true
 *         description: Repository owner (username or organization name).
 *       - in: path
 *         name: repo
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the repository.
 *       - in: path
 *         name: path
 *         schema:
 *           type: string
 *         required: true
 *         description: Path to the file inside the repository.
 *     responses:
 *       200:
 *         description: Successfully retrieved file content.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       400:
 *         description: Missing owner, repo, or path parameters.
 *       401:
 *         description: User not authenticated.
 *       404:
 *         description: File not found.
 *       500:
 *         description: Failed to fetch file from GitHub or unknown error occurred.
 */
router.get('/repos/:owner/:repo/*', getRepoFile);

export default router;
