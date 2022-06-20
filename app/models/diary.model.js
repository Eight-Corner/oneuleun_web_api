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
        emoji: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '일기장 감정 이모지',
        },
        wheather: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '일기장 날씨',
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
        modelName: 'diary',
        timestamps: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    return Diary;
};

