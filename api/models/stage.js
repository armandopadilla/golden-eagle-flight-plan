module.exports  = {
		
	identity : "stage",
	connection: "localDB",
	tableName : "stages",
	
	attributes : {
		
		id: {
			type: "integer",
			autoincrement : true,
			primaryKey : true
		},
	
		name: {
			type: "string",
			required: true,
			unique : true,
			size : 200
		},
		
		flightplan : {
			model : "flightplan"
		}
			
	},
	
	/**
	 * Check if user can update stages.
	 */
	hasUpdateAccess : function(userType, cb){
		
		//If the users is an admin then OK
		if(userType === "adminstrator"){
			return cb(null, true);
		}
		
	},
	
	hasDeleteAccess : function(userType, cb){
		
		if(userType === "adminstrator"){
			return cb(null, true);
		}
		
	},
	
	hasCreateAccess : function(userType, cb){
		
		if(userType === "adminstrator"){
			return cb(null, true);
		}
		
	}
	
	
}