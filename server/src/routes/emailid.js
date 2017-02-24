import express from 'express';
import User from '../models/User';

const router = express.Router();

router.get('/', (req, res) => {
    User.find({})
       .sort({emailId:1})
       .exec((err, emailIds) => {
           if(err) throw err;
           console.log(emailIds);
           res.json(emailIds);
       });
});

export default router;