const express = require("express");
const  mongoose = require("mongoose");
const todoRoutes = require("./routes/tasks");
const bodyParser = require('body-parser');

const PORT =  process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use("/api", todoRoutes);

async function start(){
    try{
        await mongoose.connect('mongodb+srv://marina:1234@cluster0-qgwjm.mongodb.net/todos',{
            useNewUrlParser: true,
            useFindAndModify: false
        });
        app.listen(PORT, ()=>{
            console.log('Server has been started...')
        })
    } catch (e) {
        console.log(e)
    }
}
start();


