const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Posts = require('./Model/Posts');
const cors = require('cors');

app.use(express.json());


app.use(cors());

app.post('/posts',async (req,res)=>{

    const posts = new Posts(req.body)

    try{
        const data = await posts.save();
        res.json(data);

    }catch(err){
        console.log(err);
    }

})


app.get('/', async (req, res)=>{

    try{
const data = await Posts.find()
res.json(data);
    }catch(err){
        console.log(err);
    }

})

app.get('/id/:id',async (req, res)=>{

    try{
const data = await Posts.findById(req.params.id);
res.json(data);

    }catch(err){console.log(err)}

})

app.get('/title/:title',async (req, res)=>{

    try{
const data = await Posts.findOne({title:req.params.title});
res.json(data);

    }catch(err){console.log(err)}

})


app.patch('/update', async (req, res)=>{
const id = req.body.id
    try {
        const data = await Posts.findByIdAndUpdate(id,{$set:{"title":req.body.title,"content":req.body.content}})
        res.json(data);
    } catch (error) {
        
    }
})


app.delete('/delete/:id', async (req, res)=>{
    await Posts.findByIdAndDelete(req.params.id)
    res.send("data deleted successfully...!!!");
})

mongoose.connect("mongodb://localhost:27017/Demo",{ useNewUrlParser: true,useUnifiedTopology: true },()=>{console.log("db is connected...!!!");});

app.listen(5000);