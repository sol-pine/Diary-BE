import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Line = new Schema(
    {
        userId: {
            type: String,
            require: true,
        },
        date: {
            type: Date,
            require: true,
        },
        line: {
            type: String,
            require: true,
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default mongoose.model("Lines", Line);
