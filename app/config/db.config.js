// todo:: true : dev, false: prod
let isDev = true;

    // HOST: 'localhost',
let config = {
    dev: {
        HOST: 'ec2-54-180-83-21.ap-northeast-2.compute.amazonaws.com',
        USER: 'admin',
        PASSWORD: 'Thiskim12!@',
    },
    /* 개발서버 1개로 통합
    prod: {
        USER: 'admin',
        HOST: 'ec2-13-209-21-178.ap-northeast-2.compute.amazonaws.com',
        PASSWORD: 'Thiskim12!@'
    },*/
}

function getConfig(key) {
    // return isDev ? config.dev[key] : config.prod[key];
    return isDev ? config.dev[key] : config.dev[key];
}

//    "host": "ec2-107-23-80-232.compute-1.amazonaws.com",
module.exports = {
    isDev,
    config,
    getConfig,
    HOST: "localhost",
    PORT: "3306",
    USER: getConfig('USER'),
    PASSWORD: "Thiskim12!@",
    DB: "oneuleun",
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
