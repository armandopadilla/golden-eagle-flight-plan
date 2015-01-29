module.exports = {
	
	
	/**
	 * Add a new runway.
	 */
	add : function(req, res){
		
		res.render("runway/add");
		
	},
	
	
	/**
	 * Save the new runway.
	 */
	save : function(req, res){
		
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