import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Redirects to GitHub authentication.
 *     tags:
 *       - Authentication
 *     responses:
 *       302:
 *         description: Redirects to the GitHub authentication page.
 */
router.get('/', (req, res) => {
    res.redirect('/auth/github');
});

export default router;