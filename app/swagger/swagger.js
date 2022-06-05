const swaggerUi = require("swagger-ui-express")
const swaggerJSDoc = require('swagger-jsdoc');

var swaggerDefinition = {
    info : { // 정보 작성
        version: "1.0.0",
        title: "Diary API DOCS",
        description: "Diary Web API 문서입니다. ",
    },
    host : "localhost:8081", // base-url
    basePath : "/api" // base path
};

var options = {
    swaggerDefinition: swaggerDefinition,
    apis : [__dirname + '/../routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
