import express from 'express';
import locate from './locate';
import emailid from './emailid';

const router = express.Router();

router.use('/*', (req, res, next) => {
    res.setHeader('Expires', '-1');
    res.setHeader('Cache-Control', 'must-revalidate, private');
    next();
});

router.use('/locate', locate);
router.use('/emailid', emailid);

export default router;