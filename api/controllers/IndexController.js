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
		
		
		user.findOneByUsername(username).populateAll().then(function(userResp){
			
			if(userResp === undefined){
				res.json({"status" : "OK", "data" : {"error_message" : "Username or password not valid.", "valid" : "no"}}, 200);
				return;
			}
			
			if(userResp.password === password){
				
				//Set the sessions.
				req.session.username       = userResp.username;
				req.session.userId         = userResp.id;
				req.session.userType       = userResp.type;
				req.session.departmentId   = userResp.department.id || "0";
				req.session.departmentName = userResp.department.name || "Admin";
				req.session.flightplan	   = userResp.flightplan || 0;
				
				//Send the user to the home page.
				res.json({"status" : "OK", "data" : {"valid" : "yes"}}, 200);
				
			}
			else{
				res.json({"status" : "OK", "data" : {"error_message" : "Username or password not valid.", "valid" : "no"}}, 200);
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
			
		}
		
		
		//Check if the user has access to the flight plan.
		//Note I would have placed this in the model in a pre fetch hook
		//but it seems waterline the ORM doesnt have this for fetching...:-|...weak.
		flightplan.hasAccess(req.session.userId, req.session.userType, req.session.flightplanId, function(err, resp){
			
			if(resp === false){
				res.render('index/home', response);
			}
			
			//Fetch the content
			runway.find({}, function(err, r){
				
				stage.find({}, function(err, s){
					
					//Create the row
					checkpoint.find({}, function(err, c){
						
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
				
						res.render('index/home', response);
						
					});
				});
			});
			
		});
		
	}
}