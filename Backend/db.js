import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
console.log("MONGODB_URI from env:", process.env.MONGODB_URI);

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;