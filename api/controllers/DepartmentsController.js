module.exports = {
		
	/**
	 * Manage departments.
	 */
	manage : function(req, res){
		
		//Fetch all the departments
		department.find({}).then(function(resDepts){
			
			var departments = resDepts || [];
			console.log(departments);
			
			
			res.render('departments/manage', {"departments" :  departments});
			
		})
		
	},
	
	
	flightplans : function(req, res){
		
		//Initialize vars
		var id = req.param("id");
		
		flightplan.find({"department" : id, "user" : 0}).then(function(resFlightplans){
			
			console.log(resFlightplans);
			//Fetch all 
			var plans = resFlightplans || [];
			
			res.render('departments/flightplans', {"plans" : plans});
			
		});
		
	}
		
		
		
		
		
}