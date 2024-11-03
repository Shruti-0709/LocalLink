const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require("cors")
const authRouter = require('./routes/auth/auth-routes')
const adminProductsRouter=require("./routes/admin/products-routes")
const shopProductsRouter=require("./routes/shop/products-routes")

mongoose
.connect("mongodb+srv://shrutishreya0709:e78RsaGIRkviQHXY@cluster0.tevlv.mongodb.net/")
.then(()=>console.log("MongoDB connected"))
.catch(e=>(console.log("Error in connectiong",e)))

const app=express()
const PORT=process.env.PORT || 5000;


//in use we can mention wht things the apps is going to use
app.use(
    cors({
        origin : "http://localhost:5173",
        methods : ['GET','POST','DELETE','PUT'],
        allowedHeaders: [
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials : true
    })
)
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/admin/products',adminProductsRouter);
app.use('/api/shop/products',shopProductsRouter)

app.listen(PORT,()=>console.log(`Server is now running on port ${PORT}`))