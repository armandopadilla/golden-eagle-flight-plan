module.exports = {

	/**
	 * Manage - only Admins can get here.
	 */
	manage : function(req, res){

		//Pull.
		stage.find({}).then(function(stages){

			res.render("stage/manage", {"stages" : stages});

		});

	},



	/**
	 * Form - Add a new stage to the system
	 */
	add : function(req, res){

		//Initialize vars
		var fid = req.param("fid") || 0;

		res.render('stage/add', {"fid" : fid});

	},


	/**
	 * Actually saves the stage into the system
	 * or updates the stage.
	 */
	save : function(req, res){

		//Fetch the name of the new stage
		var stageName = req.param("stage_name"),
			flightId  = req.param("fid");

		var stageObj = {"name" : stageName, "flightplan" : flightId};

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

		var stageId = req.param("id");

		//Delete
		stage.destroy({"id" : stageId}, function(err, resp){

			var response = {"status" : "OK", "data" : {"transaction_status" : "SUCCESS"}};
			res.json(response, 200);

		});

	}

}
