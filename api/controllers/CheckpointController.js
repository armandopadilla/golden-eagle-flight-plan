module.exports = {


	/**
	 * Add Form.
	 */
	add : function(req, res){

		var flightplanId = req.param("fid") || 0;

		//Fetch the runways and stages.
		stage.find({"flightplan" : flightplanId}, function(err, stageResp){

			runway.find({"flightplan" : flightplanId}, function(err, runwayResp){

				//Set the template vars & display.

				var templateObj = {"runways" : runwayResp,
								   "stages" : stageResp,
								   "fid" : flightplanId};

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
			cp = req.param("checkpoint"),
			contentType = req.param("content_type"),
			content 	= req.param("content"),
			flightplanId = req.param("fid") || 0;

		var checkpointObj = {"runway" : runwayId,
							 "stage" : stageId,
							 "contentType" : contentType,
							 "content" : content,
							 "name" : cp,
							 "flightplan" : flightplanId,
							 "status" : "unchecked"};

		//Save the checkpoint
		var data = {"transaction_status" : "SUCCESS"};
		var responseJson = {"status" : "OK", "data" :""};

		checkpoint.create(checkpointObj, function(err, response){

			if(err){
				data = {"transaction_status" : "FAILED", "error" : err};
				responseJson.data = data;
				return res.json(responseJson, 200);
			}

			//Add it to all users who have this flightplan...yea this is bad.
			user.find({"flightplan":flightplanId}).then(function(results){

				for(var i=0; i<results.length; i++){

					checkpointObj.account_id = results[i].id;
					checkpoint.create(checkpointObj, function(err, response2){
						if(err){
							console.log(err);
						}
					});

				}

				data = {"transaction_status" : "SUCCESS"};
				responseJson.data = data;
				return res.json(responseJson, 200);

			});

		});

	},


	/**
	 * Edit the checkpoint Form.
	 */
	edit : function(req, res){

		//Initialize vars
		var checkpointId = req.param("id"),
			flightplanId = req.param("fid");

		//Fetch the checkpoint info
		checkpoint.findOne({"id" : checkpointId }).populateAll().then(function (resp){


			//Fetch the runways
			runway.find({ "flightplan" : flightplanId }).then(function(respRunways){

				//Fetch the stages
				stage.find({ "flightplan" : flightplanId }).then(function(respStages){

					//Set the view variables and render
					res.render('checkpoint/edit', {"checkpoint" : resp,
												   "runways" : respRunways,
												   "stages" : respStages,
												   "fid" : flightplanId });

				});

			});


		});

	},


	/**
	 * Update the checkpoint
	 */
	save_edit: function(req,res){

		//Fetch values
		var id = req.param("id"),
			name = req.param("name"),
			contentType = req.param("content_type"),
			content = req.param("content"),
			stageId = req.param("stage"),
			runwayId = req.param("runway"),
			oldName = req.param("old_name"), //yea this sucks too.  I need to clean this up.  tech debt!
			oldStageId = req.param("old_stage_id"),
			oldRunwayId = req.param("old_runway_id");

		//Update the checkpoint
		var updateObj = {"name" : name,
				 "contentType" : contentType,
				 "content" : content,
				 "stage" : stageId,
				 "runway" : runwayId};

		checkpoint.update({"id" : id}, updateObj, function(err, updates){

			//Update all checkpoints for the flightplan+checkpoints name
			var whereClause = {"name" : oldName, "stage" : oldStageId, "runway" : oldRunwayId};

			checkpoint.update(whereClause, updateObj, function(err, updates2){
			});

			var data = {};
			if(err){
				data = {"transaction_status" : "FAILED", "error" : err};
			}
			else{
				data = {"transaction_status" : "SUCCESS"};
			}

			var response = {"status" : "OK", "data" : data};
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

			//Remove the checkpoint for all users.

			var data = {};
			if(err){
				data = {"transaction_status" : "FAILED", "error" : err};
			}
			else{
				data = {"transaction_status" : "SUCCESS"};
			}

			var response = {"status" : "OK", "data" : data};
			res.json(response, 200);

		});

	},


	/**
	 * Update the checkpoint status (ajax call in grid)
   *
   * Admin, owner, or Advisor
	 */
	checkoff: function(req,res){

		//Fetch values
		var id = req.param("id"),
			status = req.param("status");

		//Update the checkpoint
		checkpoint.update({"id" : id}, {"status" : status}, function(err, updates){

			var data = {};
			if(err){
				data = {"transaction_status" : "FAILED", "error" : err};
			}
			else{
				data = {"transaction_status" : "SUCCESS"};
			}

			var response = {"status" : "OK", "data" : data};
			res.json(response, 200);

		});

	},

}
