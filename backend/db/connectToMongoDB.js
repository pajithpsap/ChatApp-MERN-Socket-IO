import mongoose from "mongoose";

const connectToMongoDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to Mongodb");
    } catch (error) {
        console.log("Error connecting to mongodb : ", error.message);
    }
}

export default connectToMongoDb;