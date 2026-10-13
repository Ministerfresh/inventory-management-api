//const { find, findOne } = require('../models/userModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// Create
exports.createUser = async (req, res) => {
    try{
        const{name, password, email, role, phone} = req.body;
        if(req.body == null){
            res.json({ message: 'Please fill Up The Required Data' });
        };
        //Check existing email
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({ Message: 'User with Email already exist' })
        } 

        const existingPhone = await User.findOne({phone});
        if(existingPhone){
            return res.status(400).json({ Message: 'User with phone number already exist' })
        }

        //Hash Password
        const passwordHash = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            password: passwordHash,
            email,
            role,
            phone,
        });
        return res.status(200).json({ message: 'User created successfully' })
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        // Generate Token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};