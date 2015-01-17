module.exports = {
		
		
	/**
	 * Add Form.
	 */
	add : function(req, res){
		
		//Fetch the runways and stages.
		stage.find({}, function(err, stageResp){
			
			runway.find({}, function(err, runwayResp){
				
				//Set the template vars & display.
				console.log(stageResp);
				
				var templateObj = {runways : runwayResp, 
								   stages : stageResp};
				
				res.render('checkpoint/add', templateObj);
				
			});
			
		});
	
	},

	
	/**
	 * Save the checkpoint.
	 * 
	 */
	save : function(req, res){
		
		var runwayId = req.param("runway_id"),
			stageId  = req.param("stage_id"),
			cp = req.param("checkpoint");
		
		var checkpointObj = {"runway" : runwayId, 
							 "stage" : stageId,
							 "name" : cp };
		
		//Save the checkpoint
		checkpoint.create(checkpointObj, function(err, response){
			
			var response = {"status" : "OK", "data" : {"transaction_status" : "SUCCESS"}};
			res.json(response, 200);
			
		});
		
	},
	
	
	/**
	 * Edit the checkpoint Form.
	 */
	edit : function(req, res){
		
		//Initialize vars
		var checkpointId = req.param("id");
		
		//Fetch the checkpoint info
		checkpoint.findOne({"id" : checkpointId }).populateAll().then(function (resp){
			
			//Set the view variables and render
			console.log(resp);
			res.render('checkpoint/edit', resp);
			
		});
			
	},
	
	
	/**
	 * Update the checkpoint
	 */
	save_edit: function(req,res){
		
		//Fetch values
		var id = req.param("id"),
			name = req.param("checkpoint");
		
		//Update the checkpoint
		checkpoint.update({"id" : id}, {"name" : name}, function(err, updates){
			
			var response = {"status" : "OK", "data" : {"transaction_status" : "SUCCESS"}};
			res.json(response, 200);
			
		});
		
	},
	
	
	/**
	 * Delete the checkpoint.
	 */
	delete : function(req, res){
		
		//Fetch the value
		var checkpointId = req.param("id");
		
		checkpoint.destroy({"id" : checkpointId}, function(err, destroyed){
			
			var response = {"status" : "OK", "data" : {"transaction_status" : "SUCCESS"}};
			res.json(response, 200);
			
		});
		
	}
		
}