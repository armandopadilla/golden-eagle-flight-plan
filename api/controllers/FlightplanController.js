module.exports = {
		
		
		/**
		 * View all my flight plans.
		 */
		index : function(){
			
			res.render();
			
		},
		
		
		/**
		 * View all user flightplans in the system.
		 */
		all : function(req, res){
			
			//Make sure the user is an advisor.

			flightplan.find({"user" : {'!' : '0'}}).populateAll().then(function(resp){
				
				res.render("flightplan/all", {flightplans: resp});
				
			});
			
		},
		
		
		/**
		 * Manage all flightplans. 
		 * Remove, View, Edit.
		 */
		manage : function(req, res){
			
			flightplan.find({}).populateAll().then(function(resp){
				
				res.render("flightplan/manage", {flightplans: resp});
				
			});
			
		},
		
		
		/**
		 * View a specific flightplan.
		 */
		view: function(req, res){
			
			var id = req.param("id");
			
			//Fetch the content
			runway.find({"flightplan" : id}, function(err, r){
				
				stage.find({"flightplan" : id}, function(err, s){
					
					//Fetch the checkpoints
					checkpoint.find({"flightplan" : id, "account_id" : null}, function(err, c){
						
						//Create a container
						var container = [];
						for(var i=0; i<c.length; i++){
							
							
							//initialize the array for the runway and stage
							if(typeof container[c[i].runway] != "object"){
								container[c[i].runway] = [];
								
							}
							
							if(typeof container[c[i].runway][c[i].stage] != "object"){
								container[c[i].runway][c[i].stage] = [];
							}
							
							container[c[i].runway][c[i].stage].push(c[i]);
						}

						var response = {"runway" : r,
							    "stage" : s,
							    "checkpoints" : container || [],
							    "username" : req.session.username,
							    "userType" : req.session.userType,
							    "major" : req.session.departmentName,
							    "fid" : id};
				
						res.render('flightplan/view', response);
					
					});
				});
			});
			
			
		},
		
		
		/**
		 * Add new flight plan landing page
		 */
		add: function(req, res){
			
			var departmentId = req.param("did");
			
			res.render("flightplan/add", {"departmentId" : departmentId});
		},
		
		
		/**
		 * Save a flightplan.
		 */
		save: function(req, res){
			
			//Fetch params
			var name = req.param("name"),
				departmentId = req.param("did");
			
			console.log(name+" "+departmentId);
			var obj = {"name": name, 
					   "department" : departmentId,
					   "revision" : 1, 
					   "status" : "inactive"};
			
			//Save 
			flightplan.create(obj, function(err, resp){
				
				//Respond
				var data = {"transaction_status" : "SUCCESS"};
				if(err){
					data = {"transaction_status" : "FAILED", "error" : err};
				}
				else{
					data = {"transaction_status" : "SUCCESS"};
				}
				
				var respObj = {"status" : "OK", "data" :data};
				
				res.json(respObj, 200);
				
			});
			
		},
		
		setasofficial: function(req, res){
			
			//Init vars
			var planId = req.param("fid") || 0,
				departmentId = req.param("did") || 0;
			
			//Turn the active one off.
			flightplan.update({"status" : "active", "department" : departmentId}, {"status" : "inactive"}, function(err, resp){
				
				//Turn this one on.
				flightplan.update({"id" : planId}, {"status" : "active"}, function(err, resp){
					
					var data = {"transaction_status" : "SUCCESS"};
					
					if(err){
						data = {"transaction_status" : "FAILED", "error" : err};
					}
					else{
						
						//Update the users flightplans (yea i see what the prof was saying...this approach sucks pretty hard)
						user.update({"department" : departmentId}, {"flightplan" : planId}, function(err, resp){
							
							data = {"transaction_status" : "SUCCESS"};
							var respObj = {"status" : "OK", "data" :data};
							res.json(respObj, 200);
							
						});
						
					}
					
					var respObj = {"status" : "OK", "data" :data};
					
					res.json(respObj, 200);
					
				});
				
				
			});
			
		}
		
}