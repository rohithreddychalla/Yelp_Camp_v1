var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middlewares/index")


//Comments New
router.get("/new",middleware.isLoggedIn, function(req, res){
    // find campground by id
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               campground.comments.push(comment);
               campground.save();
               console.log(comment);
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});

//edit comment
router.get("/:comment_id/edit",middleware.checkCommentsOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
		    req.flash("error","you are not allowed to do that")
			res.render("back");
		}else{
			req.flash("success","comment updated")
			res.render("comments/edit",{comment:foundComment,campground_id:req.params.id});
		}
	});
});

//update comments

router.put("/:comment_id",middleware.checkCommentsOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updated){
		if(err){
			req.flash("error","you are not allowed to do that")
			console.log(err);
		}else{
			res.redirect("/campgrounds/"+req.params.id)
		}
	});
});

//delete comment
router.delete("/:comment_id",middleware.checkCommentsOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err,deleted){
		if(err){
			console.log(err);
		}else{
			req.flash("success","comment deleted")
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});







module.exports = router;