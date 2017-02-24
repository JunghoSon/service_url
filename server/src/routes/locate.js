import express from 'express';
import mongoose from 'mongoose';
import Locate from '../models/Locate';
import User from '../models/User';

const router = express.Router();

router.post('/', (req, res) => {
    if(typeof req.body.url !== 'string' || req.body.url === ''){
        res.status(400).json({
            success: false,
            message: '잘못된 URL 입니다'
        });
    }
    
    const { url, title, email } = req.body;
    
    let emailId = email.split('@')[0];
    
    const createUser = (user) => {
        if(!user) return User.create(emailId);
        
        return Promise.resolve(false);
    };
    
    const createLocate = (user) => {
        return Locate.create(url, title, email);
    };
    
    const respond = () => {
        return res.json({
            success: true
        });
    };
    
    const onError = (error) => {
        res.status().json({
            message: error.message
        });
    }
    
    User.findOneByEmail(emailId)
        .then(createUser)
        .then(createLocate)
        .then(respond)
        .catch(onError);
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

router.get('/:emailId', (req, res) => {
    let query = {};
    if(req.params.emailId !== 'all'){
        let re = new RegExp('^' + req.params.emailId);
        query.email = {$regex: re};
    }
    
    Locate.find(query)
       .sort({_id:-1})
       .limit(10)
       .exec((err, Locates) => {
           if(err) throw err;
           res.json(Locates);
       });
});

router.get('/:emailId/:id', (req, res) => {
    let objectId = new mongoose.Types.ObjectId(req.params.id);
    let query = {_id: {$lt: objectId}};
    
    if(typeof req.params.emailId !== 'undefined' && req.params.emailId !== 'all'){
        let re = new RegExp('^' + req.params.emailId);
        query.email = {$regex: re};
    }
    
    Locate.find(query)
       .sort({_id:-1})
       .limit(10)
       .exec((err, Locates) => {
           if(err) throw err;
           res.json(Locates);
       });
});

export default router;