const express=require("express");
const bodyparser=require("body-parser");
const ejs = require("ejs");
var _ =require("lodash");
 

const aboutcontent="so I am amalendu manoj .I developed this site to post my daily vlog."
const contactcontent="you can contact me here ";
let vlogs=[];
const app=express();
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/',function(req,res){
    res.render('home',{posts:vlogs});
    
})
app.get('/about',function(req,res){
    res.render('about',{content:aboutcontent})
})
app.get('/contact',function(req,res){
    res.render('contact',{content:contactcontent})
})
app.get('/compose',function(req,res){
    res.render('compose')
})
app.post('/compose',function(req,res){
    var vlogtitle=req.body.vlogtitle;
    var vlogcontent=req.body.vlogpost;
    const vlog={
        title:vlogtitle,
        content:vlogcontent,
    }
    vlogs.push(vlog);
    res.redirect('/');
})
app.get("/posts/:tests",function(req,res){
    
    const  x=_.lowerCase(req.params.tests);
    vlogs.forEach(function(vlog1){
        const stored=_.lowerCase(vlog1.title);
        if (x===stored){
            res.render("item",{title:vlog1.title,content:vlog1.content})
        }
    })
})


app.listen(3002,function(){
    console.log("server is started");
})