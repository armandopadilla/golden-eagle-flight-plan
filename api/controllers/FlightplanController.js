module.exports = {
		
		
		/**
		 * View all my flight plans.
		 */
		index : function(){
			
			if(req.session.userId === undefined){
				res.redirect("/login");
				return;
			}
			
			res.render();
			
			
		},
		
		
		/**
		 * View all user flightplans in the system.
		 */
		all : function(req, res){
			
			if(req.session.userId === undefined){
				res.redirect("/login");
				return;
			}
			
			//Make sure the user is an advisor.
			
			flightplan.find({"user" : {'!' : '0'}}).populateAll().then(function(resp){
				
				res.render("flightplan/all", {flightplans: resp});
				
			});
			
		},
		
		
		/**
		 * Mange all flightplans. 
		 * Remove, View, Edit.
		 */
		manage : function(req, res){
			
			if(req.session.userId === undefined){
				res.redirect("/login");
				return;
			}
			
			flightplan.find({}).populateAll().then(function(resp){
				
				res.render("flightplan/manage", {flightplans: resp});
				
			});
			
		},
		
		
		/**
		 * View a specific flightplan.
		 */
		view: function(req, res){
			
			if(req.session.userId === undefined){
				res.redirect("/login");
				return;
			}
			
			var id = req.param("id");
			
			//Fetch the content
			runway.find({"flightplan" : id}, function(err, r){
				
				stage.find({"flightplan" : id}, function(err, s){
					
					//Create the row
					checkpoint.find({"flightplan" : id}, function(err, c){
						
						//Create an array
						var xx = [];
						for(var i=0; i<c.length; i++){
							
							xx[c[i].runway] = [];
							xx[c[i].runway][c[i].stage] = c[i];
						}
					
						var response = {"runway" : r,
							    "stage" : s,
							    "checkpoints" : xx,
							    "username" : req.session.username,
							    "userType" : req.session.userType,
							    "major" : req.session.departmentName };
				
						res.render('flightplan/view', response);
						
					});
				});
			});
			
			
		}
		
}