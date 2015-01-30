module.exports  = {
		
	identify : "checkpoint",
	connection: "localDB",
	tableName : "checkpoints",
	
	attributes : {
		
		id: {
			type: "integer",
			autoincrement : true,
			primaryKey : true
		},
	
		name: {
			type: "string",
			required: true,
			size: 200
			
		},
		
		//A checkpoint belongs to a single runway.
		runway : {
			model: "runway",
			required : true
		},
		
		//A checkpoint belongs to a single stage.
		stage : {
			model: "stage",
			required : true
		},
		
		//A checkpoint might have content. So not required.
		content : {
			type : "text",
		},
		
		contentType : {
			type: "text",
			enum : ['text', 'file', 'url']
		}, 
		
		//A checkpoint can only belong to a single flight plan.
		flightplan : {
			model : "flightplan"
		},
		
		//Checked or unchecked.
		status : {
			type: "string",
			required: true,
			enum: ["checked", "unchecked"]
		}
			
	},
	
	/**
	 * Check is the user can delete a checkpoint.
	 * Only administrators can delete a checkpoint.
	 */
	hasDeleteAccess : function(userType, cb){
		
		//If the users is an admin then OK
		if(userType === "administrator"){
			return cb(null, true);
		}
		
	},
	
	
	/**
	 * Check of the user can add new checkpoints.
	 */
	hasCreateAccess : function(userType, cb){
		
		//If the users is an admin then OK
		if(userType === "administrator"){
			return cb(null, true);
		}
		
	}
	
}