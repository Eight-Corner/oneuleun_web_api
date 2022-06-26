// todo:: true : dev, false: prod
let isDev = false;

    // HOST: 'localhost',
let config = {
    dev: {
        HOST: 'localhost',
        USER: 'admin',
        PASSWORD: 'Thiskim12!@',
    },
    prod: {
        USER: 'admin',
        HOST: 'http://oneuleun.o-r.kr',
        PASSWORD: 'Thiskim12!@'
    },
}

function getConfig(key) {
    return isDev ? config.dev[key] : config.prod[key];
    // return isDev ? config.dev[key] : config.dev[key];
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
