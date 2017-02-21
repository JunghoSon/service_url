import express from 'express';
import locate from './locate';

const router = express.Router();


router.use('/*', (req, res, next) => {
    res.setHeader('Expires', '-1');
    res.setHeader('Cache-Control', 'must-revalidate, private');
    next();
});

router.use('/locate', locate);

export default router;