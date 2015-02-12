module.exports = {
	
	
	/**
	 * Manage - only Admins can get here.
	 */
	manage : function(req, res){
		
		//Pull.
		runway.find({}).then(function(runways){
			
			res.render("runway/manage", {"runways" : runways});
			
		});
		
	},
		
		
	/**
	 * Add a new runway.
	 */
	add : function(req, res){
		
		//Check if we are adding to a specific flightplan
		var planId = req.param("fid") || 0;
		
		res.render("runway/add", {"fid" :  planId});
		
	},
	
	
	/**
	 * Save the new runway.
	 */
	save : function(req, res){

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
		
		var id   = req.param("id");
		
		runway.findOne({"id" : id}).then(function(resp){
			
			res.render("runway/edit", {r : resp});
			
		})
		
	},
	
	save_edit : function(req, res){

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
		
		var id = req.param("id");
		
		runway.destroy({"id" : id}, function(err, resp){
			
			var response = {"status" : "OK", "data" : {"transaction_status" : "SUCCESS"}};
			res.json(response, 200);
			
		});
		
	}
	
}