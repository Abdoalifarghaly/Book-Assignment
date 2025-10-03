require('dotenv').config();
const express=require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const cors=require("cors")
const helmet=require('helmet')

const PORT=process.env.PORT

const app=express();


app.use(helmet())
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//handel error

app.get('/api/health', (req, res) => res.json({ ok: true, time: Date.now() }));

// routes (سيتم إضافتها لاحقاً)
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const reviewRoutes = require('./routes/reviews');

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status||500).json({error:err.message||"server erorr"})
})

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected To DataBase Susscessfuly")
    app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
}).catch(err=>{
    console.error("Wrong to connect to data base",err)
    process.exit(1)

})