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
const allowedOrigins = [
  "http://localhost:3000",
  "https://book-assignment-beta.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan('dev'))

//handel error


app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Book API</title>
        <style>
          body { font-family: sans-serif; background: #f8f9fa; text-align:center; padding-top:50px; }
          h1 { color: #333; }
          p { color: #666; }
        </style>
      </head>
      <body>
        <h1>🚀 Book API Server is Running</h1>
        <p>Go to <a href="/api/health">/api/health</a> to check server health.</p>
      </body>
    </html>
  `);
});

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