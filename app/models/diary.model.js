'use strict';

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Diary extends Model {
        static associate(models) {
            // define association here
        }
    }
    
    Diary.init({
        d_no: {
            field: 'd_no',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: '일기장 ID',
        },
        nickname: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            comment: '사용자 닉네임'
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '일기장 제목'
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '일기장 내용'
        },
    }, {
        sequelize,
        modelName: 'Diary',
    });
    /* foreignKey 연결
    Diary.associate = function (models) {
        Diary.hasMany(models.Tags);
    };*/
    return Diary;
};

