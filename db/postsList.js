import mongoose from "mongoose";

export const posts = [
    {
        _id: new mongoose.Types.ObjectId(),
        firstName: "Anna",
        lastName: "Yakushkina",
        occupation: "Teacher",
        title: "Gaming",
        text: "Gaming is another way of saying 'to play video games'. Do you love gaming?",
        imgUrl: "post-1.png",
        views: 0,
        likes: new Map([]),
        comments: [],
        picturePath: "main-user.jpg",
    },
        {
        _id: new mongoose.Types.ObjectId(),
        firstName: "Anna",
        lastName: "Yakushkina",
        occupation: "Teacher",
        title: "Iron Man",
        text: "My favorite hero of the Marvel universe is Iron Man. What's your favorite movie character?",
        imgUrl: "post-test.jpg",
        views: 0,
        likes: new Map([]),
        comments: [],
        picturePath: "main-user.jpg",
    },
];