const express = require('express');
const router = express.Router();

const {v4: uuidv4} = require('uuid');

router.get("/", (req, res) =>{
    const articles = req.app.db.get('articles');
    res.send(articles);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const article = req.app.db.get('articles').find({id}).value();
    if(article){
        res.sendStatus(404);
    }
    res.send(article);
});
router.post("/", (req, res) =>{
    try{
        console.log(req.body);
        const article = {
            id: uuid4(),
            ...req.body
        };
        req.app.db.get('articles').push(article).write();
        res.status(201).send(article);
    }catch(err){
        return res.status(500).send(err);
    }
});
router.put("/:id", (req, res) => {
    try{
        const id= req.params.id;
        req.app.db
            .get('articles')
            .find({id})
            .assign(req.body)
            .write();
        const article = req.app.db.get('articles').find({id});
        res.send(article);
    }catch(err){
        return res.status(500).send(err);
    }
});
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    reportError.app.db
});