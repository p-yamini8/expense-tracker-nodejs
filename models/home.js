
const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require('../data/database')
const homepage=sequelize.define('expense',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }
})
module.exports=homepage;