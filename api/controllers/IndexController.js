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
		
		
		user.findOneByUsername(username).then(function(userResp){
			
			if(userResp === undefined){
				res.json({"status" : "OK", "data" : {"error_message" : "Username or password not valid.", "valid" : "no"}}, 200);
				return;
			}
			
			if(userResp.password === password){
				
				//Set the sessions.
				req.session.userId   = userResp.id;
				req.session.userType = userResp.type;
				
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
		
		runway.find({}, function(err, r){
			
			stage.find({}, function(err, s){
				
				//Create the row
				checkpoint.find({}, function(err, c){
					
					var response = {"runway" : r,
						    "stage" : [],
						    "checkpoints" : c};
			
					res.render('index/home', response);
					
				});
					
				
			});
			
			
		});
		
	}
		
	
	
	
}