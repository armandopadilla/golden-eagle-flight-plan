module.exports = {
	
	
	/**
	 * Manage - only Admins can get here.
	 */
	manage : function(req, res){
		
		if(req.session.userId === undefined){
			res.redirect("/login");
			return;
		}
		
		//Check the user is an admin
		if(req.session.userType != 'administrator'){
			res.redirect("/home");
		}
		
		//Pull.
		runway.find({}).then(function(runways){
			
			res.render("runway/manage", {"runways" : runways});
			
		});
		
	},
		
		
		
		
	/**
	 * Add a new runway.
	 */
	add : function(req, res){
		
		if(req.session.userId === undefined){
			res.redirect("/login");
			return;
		}
		
		//Check if we are adding to a specific flightplan
		var planId = req.param("fid") || 0;
		
		//Check the user is an admin
		runway.hasCreateAccess(req.session.userType, function(err, status){
			
			if(!status){
				res.redirect("/home");
			}
		});
		
		
		res.render("runway/add", {"fid" :  planId});
		
	},
	
	
	/**
	 * Save the new runway.
	 */
	save : function(req, res){
		
		if(req.session.userId === undefined){
			res.redirect("/login");
			return;
		}
		
		//Check the user is an admin
		runway.hasCreateAccess(req.session.userType, function(err, status){
			
			if(!status){
				res.redirect("/home");
			}
			
		});
		
		var runwayName = req.param("name"),
			planId     = req.param("fid");
		
		runway.create({"name" : runwayName, "flightplan" : planId}, function(err, resp){
			
			var response = {};
			if(err){
				response = {"status" : "OK", "data" : {"transaction_status" : "FAILED", "error" : err}};
			}
			else{
				response = {"status" : "OK", "data" : {"transaction_status" : "SUCCESS"}};
			}
			
			res.json(response, 200);
			
		});
		
	},

	
	/**
	 * Edit a runway.
	 */
	edit : function(req, res){
		
		if(req.session.userId === undefined){
			res.redirect("/login");
			return;
		}
		
		//Check the user is an admin
		runway.hasUpdateAccess(req.session.userType, function(err, status){
			
			if(!status){
				res.redirect("/home");
			}
			
		});
		
		var id   = req.param("id");
		
		runway.findOne({"id" : id}).then(function(resp){
			
			res.render("runway/edit", {r : resp});
			
		})
		
	},
	
	save_edit : function(req, res){
		
		if(req.session.userId === undefined){
			res.redirect("/login");
			return;
		}
		
		//Check the user is an admin
		runway.hasUpdateAccess(req.session.userType, function(err, status){
			
			if(!status){
				res.redirect("/home");
			}
		});
		
		var name = req.param("name"),
		id   = req.param("id");
	
		runway.update({"id" : id}, {"name" : name}, function(err, resp){
			var response = {"status" : "OK", "data" : {"transaction_status" : "SUCCESS"}};
			res.json(response, 200);
		});
	},
	
	
	/**
	 * Delete a runway.
	 */
	delete : function(req, res){
		
		if(req.session.userId === undefined){
			res.redirect("/login");
			return;
		}
		
		//Check the user is an admin
		runway.hasDeleteAccess(req.session.userType, function(err, status){
			
			if(!status){
				res.redirect("/home");
			}
			
		});
		
		var id = req.param("id");
		
		runway.destroy({"id" : id}, function(err, resp){
			
			var response = {"status" : "OK", "data" : {"transaction_status" : "SUCCESS"}};
			res.json(response, 200);
			
		});
		
	}
	
}