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
			minLength: 4,
			maxLength: 16,
			required : true,
			alphanumeric: true,
			notEmpty: true
		},
		
		//Each student has a major.
		department : {
			model : "department",
			required: true,
			notEmpty: true,
			integer: true
		},
		
		//Each student has a copy of a flight plan.
		flightplan: {
			model : "flightplan"
		}
		
		
	},
		
	/**
	 * Authenticate.
	 */
	authenticate : function(username, password, cb){
		
		user.findOneByUsername(username).populateAll().then(function(resp){
			
			if(resp === undefined){
				return cb(false, null);
			}
			
			if(resp.password === password){
				return cb(true, resp);
			}
			else{
				return cb(false, null);
			}
			
		});
		
	}
	
		
}