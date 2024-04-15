const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");


app.use(express.urlencoded({extended:true}));
app.use(methodOverride(`_method`));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views")); 

app.use(express.static(path.join(__dirname,"Public")));

let post = [
    {
    id:uuidv4(),    
    username:"DeepakBhai73",
    content:"I love Coding",
    },
    {
        id:uuidv4(),
        username:"GovindBhai",
        content:"This is Govind idea",
    },
           ];

app.get("/post",(req,res)=>{
    res.render("index.ejs",{post});
});
app.get("/post/new",(req,res)=>{ 
    res.render("new.ejs")
});
app.post("/post",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    post.push({id,username,content});
    res.redirect("/post");
});
app.get("/post/:id",(req,res)=>{
    let{id}=req.params;
    let posts=post.find((p)=>id===(p.id));
    res.render("show.ejs",{posts});
});
app.patch("/post/:id",(req,res)=>{
    let{id}=req.params;
    let newContent=req.body.content;
    let posts=post.find((p)=>id===p.id);
    posts.content=newContent;
    res.redirect("/post");
})
app.get("/post/:id/edit",(req,res)=>{
    let{id}=req.params;
    let posts=post.find((p)=>id===(p.id));
    res.render("edit.ejs",{posts});
})
app.delete("/post/:id",(req,res)=>{
    let{id}=req.params;
    post=post.filter((p)=>id!==p.id);
    res.redirect("/post");
})
app.listen(port,()=>{
    console.log("Listening to port : 8080 ");
});



