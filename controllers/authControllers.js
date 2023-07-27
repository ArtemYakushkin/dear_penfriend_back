import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Register user
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, picturePath, friends, location, occupation, age } = req.body;

        const isUsed = await User.findOne({ email });

        if (isUsed) {
            return res.json({ message: 'This user is already registered.' });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        let fileName = Date.now().toString() + req.files.image.name;
        const __dirname = dirname(fileURLToPath(import.meta.url));
        req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hash,
            picturePath: fileName,
            friends,
            location,
            occupation,
            age,
        });

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        );

        await newUser.save()

        res.status(201).json({
            newUser,
            token,
            message: 'Registration completed successfully.',
        });

    } catch (error) {
        res.status(500).json({ message: 'Error creating user.' });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ message: 'This user does not exist.' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.json({ message: 'Incorrect password.' });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        );

        res.status(201).json({
            token,
            user,
            message: 'You are logged in.',
        });

    } catch (error) {
        res.status(500).json({ message: 'Authorization error.' });
    }
};

// Get Me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.status(409).json({ message: 'This user does not exist.' })
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
        );

        res.status(200).json({
            user,
            token,
        });

    } catch (error) {
        res.status(500).json({ message: 'No access.' });
    }
};