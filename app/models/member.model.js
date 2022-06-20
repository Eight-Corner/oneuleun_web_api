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
        profile_img_url: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: '사용자 프로필 이미지 URL'
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '사용자 나이'
        },
        theme: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'spring',
            comment: '사용자 테마 설정'
        },
        brain_structure: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '사용자 뇌구조(추후 논의)'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '사용자 비밀번호'
        },
    }, {
        sequelize,
        modelName: 'member',
    });
    // /* foreignKey 연결
    Member.associate = function (models) {
        Member.hasMany(models.Diary);
        Member.hasMany(models.Emotion);
        Member.hasMany(models.MemberFiles);
    };
    return Member;
};

