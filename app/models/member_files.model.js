'use strict';

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MemberFiles extends Model {
        static associate(models) {
            // define association here
        }
    }

    MemberFiles.init({
        f_no: {
            field: 'f_no',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: '파일 ID',
        },
        file_name: {
            field: 'file_name',
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '파일 이름',
        },
        file_url: {
            field: 'file_url',
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '파일 URL',
        },
        file_type: {
            field: 'file_type',
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '파일 타입',
        },
        file_size: {
            field: 'file_size',
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '파일 크기',
        },
    }, {
        sequelize,
        modelName: 'member_files',
        timestamps: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    return MemberFiles;
};

