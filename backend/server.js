const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000;
const morgan = require('morgan');
const cors = require('cors')

const {errorHandler} = require('./middleware/errorMiddleware')

const userRouter = require('./routes/userRoutes')
const adminRouter = require('./routes/adminRoutes')
const connectDB = require('./config/db')

connectDB();

const app = express();

const corsOptions = {
    origin: ["http://localhost:3000"],
    methods: [
        'GET','POST','PUT','DELETE'
    ],
    credentials:true,
    allowedHeaders: [
        'Content-Type',
        'Access',
        'Authorization'
    ],
};
app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'))

app.use('/',userRouter);
app.use('/admin',adminRouter);



app.use(errorHandler);


app.listen(port, ()=> console.log(`Listening to ${port}`))