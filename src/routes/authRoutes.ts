import express from 'express';
import { githubAuth, githubCallback } from '../controllers/authController';

const router = express.Router();

/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: Authenticate via GitHub.
 *     responses:
 *       200:
 *         description: Redirect to GitHub for authentication.
 */
router.get('/auth/github', githubAuth);

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: GitHub OAuth2 callback endpoint.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The GitHub authorization code.
 *     responses:
 *       200:
 *         description: Authentication was successful.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Authentication successful!"
 *       400:
 *         description: Error retrieving the access token.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error getting access token"
 *       500:
 *         description: There was an error during authentication.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Error during authentication"
 */
router.get('/auth/github/callback', githubCallback);

export default router;
