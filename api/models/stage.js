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
			size : 200
		},
		
		//A stage belings to a single flightplan.
		flightplan : {
			model : "flightplan"
		}
			
	}
	
}