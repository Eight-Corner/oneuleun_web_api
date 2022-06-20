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
            comment: '감정 단계: 1 = 희, 2 = 노, 3 = 애, 4 = 락',
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

