import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
             useNewUrlParser: true,
             useUnifiedTopology: true,
        })
        console.log("DB Connected Successfully")
    } catch (error) {
       console.log("DB Error:" + error) 
       console.log("Retrying connection in 5 seconds...");
    setTimeout(dbConnection, 15000);  
    }

}

export default dbConnection; 