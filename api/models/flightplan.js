module.exports = {
		
	identify : "flightplan",
	connection: "localDB",
	tableName : "flightplans",
	
	attributes : {
		
		id: {
			type: "integer",
			autoincrement : true,
			primaryKey : true
		},
		
		revision : {
			type: "integer",
			required : true,
			size : 5
		},
		
		//A flight plan can belong to only a single department. 
		department: {
			model: "department",
			required: true
		},
		
		//A flight plan an belong to 0 or 1 users.
		user : {
			model: "user",
			required: false
		},
		
		
		//A flight plan can have many runways. 
		//Association: One-to-Many
		runways : {
			collection: "runway",
			via: "flightplan"
		},
		
		//A flight plan can have many stages
		//Association: One-to-Many
		stages: {
			collection: "stage",
			via : "flightplan"
		},
		
		//A flight plan can have many checkpoins.
		//Association: One-to-Many
		checkpoints : {
			collection: "checkpoint",
			via: "flightplan"
		}
		
	},
	
	
	/**
	 * Check if the user has access to the record.
	 * Use-Case: Each student can only see their own plan.
	 * Use-Case: Advisors can see the plans of all the students.
	 */
	hasAccess : function(userId, userType, flightplanId, cb){
		
		//If the users is an admin then OK
		if(userType === "advisor"){
			return cb(null, true);
		}
		
		//Fetch the plan
		flightplan.findOne({"user" : userId}).then(function(resp){
			
			if(resp === undefined){
				return cb(null, false);
			}
			
			//If its the owner then OK
			if(flightplanId === resp.flightplanId){
				return cb(null, true);
			}
			else{
				return cb(null, false);
			}
		});
		
	}
}