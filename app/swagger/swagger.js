const swaggerUi = require("swagger-ui-express")
const swaggerJSDoc = require('swagger-jsdoc');
const {getConfig, isDev} = require("../config/db.config");

let key = 'HOST'
console.log(`isDev: ${isDev}`.yellow, `config: ${getConfig(key)}`.yellow)
var swaggerDefinition = {
    info : { // 정보 작성
        version: "1.0.0",
        title: "Diary API DOCS",
        description:
            "Diary Web API 문서입니다. " +
            "<br>",
    },
    host : getConfig(key), // base-url
    basePath : "/api" // base path
};

var options = {
    swaggerDefinition: swaggerDefinition,
    apis : [__dirname + '/../routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
