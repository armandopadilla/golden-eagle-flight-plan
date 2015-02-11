module.exports = {
		
		
	/**
	 * Landing page where we display the basic grid
	 * 
	 */
	index: function(req, res){
		
		res.render("index/index");
		
	},
	
	
	/**
	 * Login page.
	 */
	login : function(req, res){
		
		res.render("index/login");
		
	},
	
	
	/**
	 * Authenticate and set session info.
	 * 
	 * @param req
	 * @param res
	 * @returns
	 */
	auth : function(req, res){
	
		var username = req.param("username"),
			password = req.param("password");
		
		user.authenticate(username, password, function(status, userResp){
			
			if(status === false){
				res.json({"status" : "OK", "data" : {"error_message" : "Username or password not valid.", "valid" : "no"}}, 200);
				return;
			}
			else{
				
				//Set the sessions.
				req.session.username       = userResp.username;
				req.session.userId         = userResp.id;
				req.session.userType       = userResp.type;
				req.session.departmentId   = userResp.department.id || "0";
				req.session.departmentName = userResp.department.name || "Admin";
				req.session.flightplan	   = userResp.flightplan || 0;
				
				flightplan.find({"department" : userResp.department.id, "user" : "0"}).then(function(plan){
					
					req.session.flightplanTId  = (plan === undefined)? null : plan.id;
					
				});
				
				
				//Send the user to the home page.
				res.json({"status" : "OK", "data" : {"valid" : "yes"}}, 200);
				
			}
			
		});
		
	},
	
	
	/**
	 * Logout.
	 */
	logout : function(req, res){
		
		req.session.destroy(function(err){
			res.render("index/index");
		});
		
	},
	
	
	/**
	 * Main landing page once the user is logged in.
	 * 
	 */
	home : function(req, res){
		
		//Check if the user is logged in. (can this be a hook?)
		if(req.session.userId === undefined){
			res.redirect("/login");
			return;
		}
		
		
		//If the user is not a student show the admin/advisor landing page.
		if(req.session.userType !== "student"){
			
			res.render('index/home', {});
			return;
		}
		
		
		//Check if the user has access to the flight plan.
		//Note I would have placed this in the model in a pre fetch hook
		//but it seems waterline the ORM doesnt have this for fetching...:-|...weak.
		flightplan.hasAccess(req.session.userId, req.session.userType, req.session.flightplanId, function(err, resp){
			
			if(resp === false){
				res.render('index/home', response);
			}
			
			//Fetch the content
			var id = req.session.flightplan.id;
			
			runway.find({"flightplan" : id}, function(err, r){
				
				stage.find({"flightplan" : id}, function(err, s){
					
					//Fetch the checkpoints
					checkpoint.find({"flightplan" : id}, function(err, c){
						
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
				
						res.render('index/home', response);
					
					});
				});
			});
			
			
			
		});
		
	}
}