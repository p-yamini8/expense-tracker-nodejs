const express = require('express');
const bcrypt=require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./data/database');
const User = require('./models/home'); // Make sure this is the correct model
const Expense=require('./models/expenses');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Sync Database
(async () => {
    try {
        await sequelize.sync();
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database', error);
    }
})();

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

// Signup Route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already registered' });
        }
const hashedpassword=await bcrypt.hash(password,10)
        await User.create({ name, email, password:hashedpassword });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'User not found. Please sign up first.' });
        }
const ismatch=await bcrypt.compare(password,user.password);
        if (!ismatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        res.status(200).json({ message: 'Login successful' });


    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});
app.post('/addexpense',async(req,res)=>{
    const {amount,description,category}=req.body;
    try{
        await Expense.create({amount:parseFloat(amount),description,category});
        res.status(201).json({ message: 'User expenses added successfully' });
    }
    catch(error){
        res.status(500).json({ message: 'Error adding  user expenses', error:error.message });
    }
})
// Start Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});