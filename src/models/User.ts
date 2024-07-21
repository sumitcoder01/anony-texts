import { Email_Regex, Password_Regex, Username_Regex } from '@/constants/regex';
import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document {
    content: string;
    createdAt: Date;
    updatedAt: Date
}

export interface Avatar extends Document {
    public_id: string;
    secure_url: string;
    createdAt: Date;
    updatedAt: Date
}

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    isGoogleAccount: boolean;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
    avatar: Avatar
}

const AvatarSchema: Schema<Avatar> = new mongoose.Schema({
    public_id: {
        type: String,
    },
    secure_url: {
        type: String,
        required: true
    }
}, { timestamps: true });

const MessageSchema: Schema<Message> = new mongoose.Schema({
    content: {
        type: String,
        trim: true,
        minLength: [10, "Content must be at least 10 characters"],
        maxLength: [300, "Content must not be longer than 300 characters"],
        required: true,
    }
}, { timestamps: true });


// Updated User schema
const UserSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [2, "Username must be at least 2 characters"],
        maxLength: [20, "Username must be no more than 20 characters"],
        match: [Username_Regex, 'Please use a valid username'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [Email_Regex, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLenght: [8, 'Password must be at least 8 characters'],
        trim: true,
        match: [Password_Regex, 'Please use a valid password'],
    },
    verifyCode: {
        type: String,
        required: [true, 'Verify Code is required'],
        validate: {
            validator: function (value: string) {
                return value.length === 6;
            },
            message: props => `${props.value} is must contains 6 digits!`
        },
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Verify Code Expiry is required'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    isGoogleAccount: {
        type: Boolean,
        default: false,
    },
    messages: [MessageSchema],
    avatar: AvatarSchema
}, { timestamps: true });

const UserModel =
    (mongoose.models.User as mongoose.Model<User>) ||
    mongoose.model<User>('User', UserSchema);

export default UserModel;