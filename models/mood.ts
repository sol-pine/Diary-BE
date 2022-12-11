import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Mood = new Schema(
    {
        userId: {
            type: String,
            require: true,
        },
        year:{
            type:Number,
            require:true
        },
        month:{
            type:Number,
            require:true
        },
        date:{
            type:Number,
            require:true
        },
        moodText: {
            type: String,
            require: true,
        },
        color: {
            type: String,
            require: true,
        }
    },
    {
        versionKey: false,
    }
);

export default mongoose.model("Moods", Mood);
