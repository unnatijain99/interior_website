
var express= require("express");
var app=express();
var mysql= require("mysql");
var faker= require("faker");
var bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));

var connection= mysql.createConnection({
    host: "localhost",
    user: "newuser",
    password:"Breadjam@99",
    database: "database1"
});

/*connection.query("select* from login",function(error,result){
    if(error)
     console.log(error)
    console.log(result) 
})*/      

app.get("/",function(req,res){
    res.render("resp");
})
app.get("/signin",function(req,res){
    connection.query("select count(*) as count from login",function(error,result){
    if(error)
     console.log(error)
    var count=result[0].count;
    res.render("yeah",{count:count}) 
})
})
app.post("/register",function(req,res){
    var person={username:req.body.username,
                password:req.body.password
    };
    connection.query("insert into login set ?", person, function(error, result){
        if(error)
          console.log(error);
        res.redirect("/signin");  
    })
})
app.get("/update",function(req,res){
    res.render("ab")
})
app.post("/cd",function(req,res){
    var vow =req.body.use;
    connection.query("update login set password=? where username=?",[req.body.new,req.body.use],function(error,result){
        if(error)
         console.log(error)
        console.log(result) 
        res.redirect("/signin")
    })
})
app.get("/review",function(req,res){
    q="select * from xy order by created_at DESC";
    connection.query(q,function(error,result){
        if(error)
         console.log(error);
        var abc=result;
        res.render("rev.ejs",{abc:abc})
    })
})

app.post("/wxy",function(req,res){
    var info={name:req.body.name,
        details:req.body.det
};
connection.query("insert into xy set ?", info, function(error, result){
    if(error)
      console.log(error);
    res.redirect("/review");  
})
})
/*connection.query("select * from user",function(error,result){
    if(eroor)
    console.log(error)
  console.log(result);
})*/

app.listen(5000,function(){
    console.log("server started");
})