import express from 'express';
import Locate from '../models/Locate';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/', (req, res) => {
    if(typeof req.body.url !== 'string' || req.body.url === ''){
        res.status(400).json({
            success: false,
            message: '잘못된 URL 입니다'
        });
    }
    
    const locate = new Locate({
        loc: req.body.url,
        title: req.body.title,
        email: req.body.email
    });
    
    locate.save((err) => {
        if(err) throw err;
        
        return res.json({
            success: true
        });
    });
});

router.get('/', (req, res) => {
    Locate.find({})
       .sort({_id:-1})
       .limit(10)
       .exec((err, Locates) => {
           if(err) throw err;
           res.json(Locates);
       });
});

router.get('/:id', (req, res) => {
    let objectId = new mongoose.Types.ObjectId(req.params.id);
    
    Locate.find({_id: {$lt: objectId}})
       .sort({_id:-1})
       .limit(10)
       .exec((err, Locates) => {
           if(err) throw err;
           res.json(Locates);
       });
});

export default router;