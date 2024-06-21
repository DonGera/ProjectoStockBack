import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    role: String
});

export const User = mongoose.model('User', UserSchema);