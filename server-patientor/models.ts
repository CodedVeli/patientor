import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name"]
    },
    occupation: {
        type: String,
        required: [true, "Please Enter occupation"]
    },
    gender: {
        type: String,
        required: [true, "Please Enter gender"]
    },
    ssn:{
        type: Number,
        required: [true, "Please Enter Social Security Number"]
    },
    dateOfBirth:{
        type: String,
        required: [true, "Please Enter DOB"]
    }

})

export const Patient = mongoose.model("Patient", schema)