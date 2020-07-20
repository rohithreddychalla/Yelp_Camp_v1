var express = require("express");
var app= express();
  
app.use(express.static("views"));
app.use(express.static("public"));
app.use(express.static("partials"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
 res.render("hello");
});

app.get("/loop", function(req, res){
	var friends= ["rusty", "rohith", "colt"];
 res.render("loop", {friends: friends});
});
			

app.get("/", function(req, res){
 res.render("public");
});
 
app.get("/dogs/:name", function(req,res){
	var name= req.params.name;
	res.send("i love " + name);
});





app.listen(3000,process.env.IP, function(){
	console.log("server started");
});