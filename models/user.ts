import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
    {
        id: {
            type: String,
            require: true,
        },
        pwd: {
            type: String,
            require: true,
        },
        code: {
            type: String,
            require: true,
        },
        salt: {
            type: String,
            require: true,
        },
        token: {
            type: String,
            require: true,
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default mongoose.model("Users", User);
