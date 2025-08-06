const { default: mongoose } = require('mongoose');
const path=require('path');
const express=require('express');
const userRouter=require('./routes/user')


const PORT=7000;
const app=express();

mongoose.connect('mongodb://127.0.0.1:27017/practice').then((e)=>{console.log('MongoDB is connected')})

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    return res.render("home")
})

app.use('/user',userRouter);

app.listen(PORT,()=>{console.log(`server started at port:${PORT}`);
})