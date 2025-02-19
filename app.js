const express=require('express');
const bodyparser=require('body-parser');
const homepage=require('./models/home');
const sequelize=require('./data/database')
//const db=require('./models/home')
const cors=require('cors');
const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
(async()=>{
    try{

await sequelize.sync();
console.log('database sync successfully');
    }
    catch(error){
        console.error('error sync',error)
    }
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/home.html');
});
app.post('/signup',async(req,res)=>{
    const homedata=req.body;
try{
    await homepage.create(homedata);
    res.status(201).json({message:'user registered successfully'})
}
catch(error){
res.status(400).json({message:'Error registering user',error})
console.log(error);
};

})
app.listen(3000,()=>{
    console.log('server is running');
})