import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import User from "../models/User.js";


export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { firstName, lastName, location, occupation, age, id } = req.body;
        const user = await User.findByIdAndUpdate(id);

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
            user.picturePath = fileName || '';
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.location = location;
        user.occupation = occupation;
        user.age = age;

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};