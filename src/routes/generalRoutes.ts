import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root endpoint to redirect to the API documentation.
 *     description: This endpoint redirects users to the API documentation when accessed.
 *     tags:
 *       - General
 *     responses:
 *       302:
 *         description: Successfully redirected to the API documentation at /api-doc.
 */
router.get('/', (req, res) => {
    res.redirect('/api-doc');
});

export default router;