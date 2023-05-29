require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const articlesRoutes = require("./routes/articles");


const port = process.env.PORT || 8081;
const FileSync = require("lowdb/adapters/FileSync");
//prueba
const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({articles: []}).write();





const option = {
    definition:{
        openapi: "3.0.0", 
        info: {
            title: "Articles API - Certus",
            version: "0.0.1",
            description: "Demo API for sales"
        },
        servers: [
            {
                url: "http://localhost:" + port,
            }
        ]
    },
    apis: [
        "./routes/*.js"
    ]
};

const specs = swaggerJSDoc(option);

const app = express();

app.use('/api.docs', swaggerUI.serve, swaggerUI.setup(specs));

app.db = db;


app.use(cors());
app.use(express.json()); 
app.use(morgan("dev"));
app.use("/api/article", articlesRoutes);

app.listen(port, () => console.log('GFAZ good job!!! on port', port));