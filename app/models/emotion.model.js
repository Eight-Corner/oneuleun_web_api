'use strict';

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Emotion extends Model {
        static associate(models) {
            // define association here
        }
    }
    
    Emotion.init({
        e_no: {
            field: 'e_no',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: '감정 ID',
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Object: { fun: 재밌음, sad: 슬펐음, angry: 불안, disgust: 불만, fear: 공포, surprise: 놀람, neutral: 무표정 }',
        },
    }, {
        sequelize,
        modelName: 'emotion',
        timestamps: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    return Emotion;
};

