import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dbConnection from './dbConfig/index.js';
import helmet from 'helmet';
import errorMiddleware from './middleware/errorMiddleware.js';
import router from './routes/index.js';
import path from 'path'

const __dirname = path.resolve(path.dirname(""))
dotenv.config()

const app = express()

const PORT = process.env.PORT || 8800

dbConnection()
 

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended: true}))

app.use(morgan("dev"))
app.use(router)
app.use(errorMiddleware)
// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'form/build')));

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})



