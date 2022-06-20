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
db.Emotion = require("./emotion.model.js")(sequelize, Sequelize);
db.DiaryFiles = require("./diary_files.model.js")(sequelize, Sequelize);
db.MemberFiles = require("./member_files.model.js")(sequelize, Sequelize);

// db foreignKey 연결
// 사용자 - 일기장
db.Member.hasMany(db.Diary, {
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
// 사용자 - 감정
db.Member.hasMany(db.Emotion, {
    foreignKey: 'm_no',
    allowNull: false,
    constraints: true,
    onDelete: 'cascade'
});
db.Emotion.belongsTo(db.Member, {
    foreignKey: 'm_no',
    allowNull: false,
    constraints: true,
});
// 일기장 - 파일
db.Diary.hasMany(db.DiaryFiles, {
    foreignKey: 'd_no',
    allowNull: false,
    constraints: true,
    onDelete: 'cascade'
});
db.DiaryFiles.belongsTo(db.Diary, {
    foreignKey: 'd_no',
    allowNull: false,
    constraints: true,
});

// 사용자 - 파일
db.Member.hasMany(db.MemberFiles, {
    foreignKey: 'm_no',
    allowNull: false,
    constraints: true,
    onDelete: 'cascade'
});
db.MemberFiles.belongsTo(db.Member, {
    foreignKey: 'm_no',
    allowNull: false,
    constraints: true,
});


// db sync
db.Member.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true : (drop) table 데이터 없어질 수 있음
    alter: process.env.TABLE_ALTER_SYNC === 'true'     // 개발 끝나면 false로 하기
})

db.Diary.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true : (drop) table 데이터 없어질 수 있음
    alter: process.env.TABLE_ALTER_SYNC === 'true'     // 개발 끝나면 false로 하기
})
db.Emotion.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // true : (drop) table 데이터 없어질 수 있음
    alter: process.env.TABLE_ALTER_SYNC === 'true'     // 개발 끝나면 false로 하기
})


module.exports = db;
