const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    dialectOptions: dbConfig.dialectOptions,
    timezone: dbConfig.timezone,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// routes 사용
db.Member = require("./member.model.js")(sequelize, Sequelize);

// db foreignKey 연결
/*
db.Member.hasMany(db.Tags, {
    foreignKey: 'm_no',
    allowNull: false,
    constraints: true,
    onDelete: 'cascade'
});
db.Tags.belongsTo(db.Member, {
    foreignKey: 'm_no',
    allowNull: false,
    constraints: true,
});

db.Tags.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true : (drop) table 데이터 없어질 수 있음
    alter: process.env.TABLE_ALTER_SYNC === 'true'     // 개발 끝나면 false로 하기
})

db.Member.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true : (drop) table 데이터 없어질 수 있음
    alter: process.env.TABLE_ALTER_SYNC === 'true'     // 개발 끝나면 false로 하기
})*/

module.exports = db;
