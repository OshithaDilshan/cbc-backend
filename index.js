import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRouter from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import jwt from "jsonwebtoken";
import ordeRouter from "./routes/orderRoute.js";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use(
    (req, res, next) => {
        const tokenString = req.header("Authorization")
        if (tokenString != null) {
            const token = tokenString.replace("Bearer ", "")

            jwt.verify(token, process.env.JWT_KEY,
                (err, decoded) => {
                    if (decoded != null) {
                        console.log(decoded)
                        req.user = decoded
                        next()
                    } else {
                        console.log("invalid token")
                        res.status(403).json({
                            message: "Invalid token"
                        })
                    }
                }
            )
        } else {
            next()
        }
    }
)

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("connected to the database")
    }).catch(() => {
        console.log("database connection failed")
    })


app.use("/api/products", productRouter)
app.use("/api/users", userRoute)
app.use("/api/orders", ordeRouter)


app.listen(5000,
    () => {
        console.log('server is running on port 5000');
    }
)