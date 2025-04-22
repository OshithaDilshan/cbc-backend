import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRouter from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import jwt from "jsonwebtoken";
import ordeRouter from "./routes/orderRoute.js";

const app = express();

app.use(bodyParser.json());

app.use(
    (req, res, next) => {
        const tokenString = req.header("Authorization")
        if (tokenString != null) {
            const token = tokenString.replace("Bearer ", "")

            jwt.verify(token, "abc-batch-five#@2025",
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

mongoose.connect("mongodb+srv://admin:123@cluster0.qeojz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("connected to the database")
    }).catch(() => {
        console.log("database connection failed")
    })


app.use("/products", productRouter)
app.use("/users", userRoute)
app.use("/orders", ordeRouter)


app.listen(5000,
    () => {
        console.log('server is running on port 5000');
    }
)