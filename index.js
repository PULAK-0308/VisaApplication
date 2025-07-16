const express = require('express')
const app = express()
const db=require('./db')
require("dotenv").config();

const bodyParse=require('body-parser');
app.use(bodyParse.json());

const userRoutes=require('./routes/userRoute');
const VisaApplicationRoutes=require('./routes/VisaApplicationRoute');

app.use('/',userRoutes);
app.use('/applications',VisaApplicationRoutes);

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log("listening on port 3000");
})