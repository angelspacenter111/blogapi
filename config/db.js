import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://root:root%40123@cluster0.xhindfj.mongodb.net/?appName=Cluster0", {
            dbName: "db_angelspa"
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Database Connection Error");
        console.log(error);
        process.exit(1);
    }
};
export default connectDB;