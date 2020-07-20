var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj= {};
  

middlewareObj.isLoggedIn= function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("error","you need to be login first ");
    res.redirect("/login");
}

middlewareObj.checkCampgroundOwnership= function (req,res,next){
    if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err){
				res.redirect("back");
			}else{
				 if(foundCampground.author.id.equals(req.user._id)){
					// console.log(foundCampground.author.id === req.user._id);
					 // res.render("campgrounds/edit",{campground:foundCampground})
					return next();
 				}else{
				res.redirect("back");		
				}
 			}
		});
	   }
 	else{
		req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
	}
}

middlewareObj.checkCommentsOwnership= function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err){
				console.log(err)
			}else{
				if(foundComment.author.id.equals(req.user._id)){
					// res.render("/comments/edit",{comment:foundComment,campground_id:req.params.id})
					return next();
				}
				else{
					res.redirect("back")
				}
			}
		});
		
	}
	else{
		res.redirect("back");
	}
}


module.exports= middlewareObj;