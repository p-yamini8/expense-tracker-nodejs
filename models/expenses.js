

const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require('../data/database')
const expenses=sequelize.define('addexpense',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    amount:{
        type:DataTypes.INTEGER,
     allowNull:false 
       
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
})
module.exports=expenses;