module.exports = {
		
		
	/**
	 * Manage - only Admins can get here.
	 */
	manage : function(req, res){
		
		//Check if the user is logged in. (can this be a hook?)
		if(req.session.userId === undefined){
			res.redirect("/login");
			return;
		}
		
		//Check the user is an admin
		if(req.session.userType != 'administrator'){
			res.redirect("/home");
		}

		
		//Pull.
		stage.find({}).then(function(stages){
			
			res.render("stage/manage", {"stages" : stages});
			
		});
		
	},
	
		
		
	/**
	 * Form - Add a new stage to the system
	 */
	add : function(req, res){
		
		if(req.session.userId === undefined){
			res.redirect("/login");
			return;
		}
		
		//Check the user is an admin\
		stage.hasCreateAccess(req.session.userType, function(err, status){
			
			if(!status){
				res.redirect("/home");
			}
			
		});
		
		res.render('stage/add');
	},
	

	/**
	 * Actually saves the stage into the system 
	 * or updates the stage.
	 */
	save : function(req, res){
		
		if(req.session.userId === undefined){
			res.redirect("/login");
			return;
		}
		
		stage.hasCreateAccess(req.session.userType, function(err, status){
			
			if(!status){
				res.redirect("/home");
			}
			
		});

		
		//Fetch the name of the new stage
		var stageName = req.param("stage_name");
		
		var stageObj = {"name" : stageName};
		
		//Save and respond.
		stage.create(stageObj, function(){
			
			var response = {"status" : "OK", "data" : {"transaction_status" : "SUCCESS"}};
			res.json(response, 200);
			
		});
		
	},
	
	
	/**
	 * Edit a specific stage.
	 * 
	 */
	edit : function(req, res){
		
		if(req.session.userId === undefined){
			res.redirect("/login");
			return;
		}
		
		//Check the user is an admin
		stage.hasUpdateAccess(req.session.userType, function(err, status){
			
			if(!status){
				res.redirect("/home");
			}
			
		});
		
		
		//Initialize 
		var stageId = req.param("id");
		
		stage.findOne({"id" : stageId}).then(function(resp){
			
			res.render('stage/edit', {s : resp});
			
		});
		
	},
	
	
	/**
	 * Save edits
	 */
	save_edit : function(req, res){
	
		if(req.session.userId === undefined){
			res.redirect("/login");
			return;
		}
		
		//Check the user is an admin
		stage.hasUpdateAccess(req.session.userType, function(err, status){
			
			if(!status){
				res.redirect("/home");
			}
			
		});
		
		
		var stageId = req.param("id"),
			name = req.param("name");
		
		//Update
		stage.update({"id" : stageId}, {"name" : name}, function(err, resp){
			
			var response = {"status" : "OK", "data" : {"transaction_status" : "SUCCESS"}};
			res.json(response, 200);
			
		});
		
	},
	
	
	/**
	 * Delete the stage.
	 */
	delete : function(req, res){
		
		if(req.session.userId === undefined){
			res.redirect("/login");
			return;
		}
		
		//Check the user is an admin
		stage.hasDeleteAccess(req.session.userType, function(err, status){
			
			if(!status){
				res.redirect("/home");
			}
			
		});
		
		var stageId = req.param("id");
		
		//Delete
		stage.destroy({"id" : stageId}, function(err, resp){
			
			var response = {"status" : "OK", "data" : {"transaction_status" : "SUCCESS"}};
			res.json(response, 200);
			
		});
		
	}
		
}