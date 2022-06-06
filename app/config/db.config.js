// todo:: true : dev, false: prod
let isDev = true;

let config = {
    dev: {
        HOST: 'localhost',
        USER: 'root',
        PASSWORD: 'Thiskim12!@',
    },
    prod: {
        HOST: 'dev-diary.cc4cswhxpsvw.us-east-1.rds.amazonaws.com',
        USER: 'admin',
        PASSWORD: 'rodtmxj.123'
    },
}

function getConfig(key) {
    return isDev ? config.dev[key] : config.prod[key];
}

//    "host": "ec2-107-23-80-232.compute-1.amazonaws.com",
module.exports = {
    isDev,
    config,
    getConfig,
    HOST: "localhost",
    PORT: "3306",
    USER: "root",
    PASSWORD: "Thiskim12!@",
    DB: "diary",
    dialect: "mysql",
    dialectOptions: {
        charset: "utf8mb4",
        dataStrings: true,
        typeCast: true
    },
    timezone: "+09:00",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false,
        supportBigNumbers: true,
    },
};
