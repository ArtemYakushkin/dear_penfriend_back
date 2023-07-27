import User from "../models/User.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

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
    // if (req.body.userId === req.params.id) {
    //     // if (req.body.password) {
    //     // const salt = await bcrypt.genSalt(10);
    //     // req.body.password = await bcrypt.hash(req.body.password, salt);
    //     // }
    //     try {
    //         const updatedUser = await User.findOneAndUpdate(
    //             req.params.id,
    //             {
    //             $set: req.body,
    //             },
    //             { new: true }
    //         );
    //         res.status(200).json(updatedUser);
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // } else {
    //     res.status(401).json("You can update only your account!");
    // }
};