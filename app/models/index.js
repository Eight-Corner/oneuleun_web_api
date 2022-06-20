const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const {getConfig} = require("../config/db.config");

const isDev = dbConfig.isDev;

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.getConfig('USER'),
    dbConfig.getConfig('PASSWORD'),
    {
        host: dbConfig.getConfig('HOST'),
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
db.Diary = require("./diary.model.js")(sequelize, Sequelize);

// db sync
db.Member.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true : (drop) table 데이터 없어질 수 있음
    alter: process.env.TABLE_ALTER_SYNC === 'true'     // 개발 끝나면 false로 하기
})

db.Diary.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true : (drop) table 데이터 없어질 수 있음
    alter: process.env.TABLE_ALTER_SYNC === 'true'     // 개발 끝나면 false로 하기
})
// db foreignKey 연결
db.Member.hasMany(db.Tags, {
    foreignKey: 'm_no',
    allowNull: false,
    constraints: true,
    onDelete: 'cascade'
});
db.Diary.belongsTo(db.Member, {
    foreignKey: 'm_no',
    allowNull: false,
    constraints: true,
});



module.exports = db;
