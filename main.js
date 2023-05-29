require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const articlesRoutes = require("./router/articles")


const port = process.env.PORT || 8081;
const FileSync = require("lowdb/adapters/FileSync");
//prueba
const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({articles: []}).write();

const app = express();

app.db = db;

const options = {
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
}

app.use(cors());
app.use(express.json()); 
app.use(morgan("dev"));
app.use("/api/article", articlesRoutes);

app.listen(port, () => console.log('GFAZ good job!!! on port', port));