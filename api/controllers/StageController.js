module.exports = {
		
	/**
	 * Form - Add a new stage to the system
	 */
	add : function(req, res){
		res.render('stage/add');
	},

	/**
	 * Actually saves the stage into the system.
	 */
	save : function(req, res){
		
		//Fetch the name of the new stage
		var stageName = req.param("stage_name");
		
		var stageObj = {"name" : stageName};
		
		//Save and respond.
		stage.create(stageObj, function(){
			
			var response = {"status" : "OK", "data" : {"transaction_status" : "SUCCESS"}};
			res.json(response, 200);
			
		});
		
		
	}
		
}