'use strict';

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Member extends Model {
        static associate(models) {
            // define association here
        }
    }
    
    Member.init({
        m_no: {
            field: 'm_no',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            comment: '사용자 ID',
        },
        uid: {
            field: 'uid',
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false,
            comment: '사용자 고유 키 값',
        },
        nickname: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            comment: '사용자 닉네임'
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            comment: '사용자 이메일'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '사용자 비밀번호'
        },
    }, {
        sequelize,
        modelName: 'Member',
    });
    /* foreignKey 연결
    Member.associate = function (models) {
        Member.hasMany(models.Tags);
    };*/
    return Member;
};

