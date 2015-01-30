module.exports = {
	
	
	/**
	 * Manage - only Admins can get here.
	 */
	manage : function(req, res){
		
		if(req.session.userId === undefined){
			res.redirect("/login");
			return;
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
		
		res.render("runway/add");
		
	},
	
	
	/**
	 * Save the new runway.
	 */
	save : function(req, res){
		
		if(req.session.userId === undefined){
			res.redirect("/login");
			return;
		}
		
		var runwayName = req.param("name");
		
		runway.create({"name" : runwayName, "flightplan" : req.session.flightplan}, function(err, resp){
			
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
		
		var id = req.param("id");
		
		runway.destroy({"id" : id}, function(err, resp){
			
			var response = {"status" : "OK", "data" : {"transaction_status" : "SUCCESS"}};
			res.json(response, 200);
			
		});
		
	}
	
}