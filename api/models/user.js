module.exports = {
		
	identity : "user",
	connection: "localDB",
	tableName : "users",
		
	attributes: {
		
		
		id: {
			type: "integer",
			autoincrement : true,
			primaryKey : true
		},
		
		//There are 3 types of users.  {"administrator" , "advisor", "student"}
		type : {
			type: "string",
			enum : ['administrator', 'advisor', 'student'],
			required: true
		},
		
		username : {
			type: "string",
			required: true,
			unique: true,
			size: 100
		},
		
		password : {
			type: "string",
			size : 16,
			required : true
		},
		
		//Each student has a major.
		department : {
			model : "department"
		},
		
		//Each student has a copy pf the flight plan.
		//Options.  Store each item in the db OR create the flight plan as JSON and update the string.
		//TODO.
		
	},
		
	/**
	 * Authenticate.
	 */
	authenticate : function(){},
	
	
	/**
	 * Fetch flight plan
	 */
	beforeFetch : function(userId, userType, cb){
		
		//Advisors can see all plans
		//OR User is owner of the flght plan.

	},
	
	/**
	 * Before updating hook. Internal to ORM 
	 * 1. Administrators can only modify the flight plan.
	 */
	beforeUpdate : function(){
		
		//Administrators can only modify the flight plan.
		
	}
	
		
}