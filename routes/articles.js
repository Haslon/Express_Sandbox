const express = require('express');
const router = express.Router();

const {v4: uuidv4} = require('uuid');

/**
 * @swagger
 * components:
 *  schemas:
 *     Articles:
 *       type: object
 *       required:
 *          - name
 *          - price
 *          - brand
 *          - stock
 *       properties:
 *          id:
 *            type: string
 *            description: ID autodenerado usando uuid
 *          name: 
 *             type: string
 *             description: Descripción del producto 
 *          price: 
 *             type: string
 *             description: Precio del producto
 *          brand: 
 *             type: string
 *             description: Marce del producto
 *          stock: 
 *             type: string
 *             description: Stock del producto
 *       example:
 *          id: e4841818a-1a26-45dd-41a16161616fd
 *          name: Licuadora
 *          price: 150.0
 *          brand: LG
 *          stock: 15
 */

/**
 * @swagger
 * tags:
 *  name: Articles
 *  description: API para la lista de productos|
 * 
 */

/**
 * @swagger
 * /api/articles:
 *  get:
 *      summary: Devuelve una lista de productos
 *      tags: [Articles]
 *      response:
 *          200:
 *              description: Lista de las ventas
 *              content: 
 *                  application/json
 *              schema:
 *                  type: array
 *                  $ref: "#/components/schemas/Articles"
 */




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
    req.app.db
        .get('articles')
        .remove({id})
        .write();
    res.sendStatus(200);
});
module.export = router