import mongoose from 'mongoose';

const uri = "mongodb+srv://admin:QGLyalBzjyFXjiis@back.nrcsipj.mongodb.net/?retryWrites=true&w=majority&appName=Back";


export const connectDB = () => {
    return mongoose
        .connect(uri, {
        })     
};
